import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { LoginButton, SettingsButton } from "../../common/buttons";
import { SettingModal } from "../../common/modals";
import { LabelField } from "../../common/fields";
import { LoginCardForm } from "../../common/forms";
import { TextInput } from "../../common/inputs";
import { useAppModal } from "../../errors/AppModalContext";
import { useLocalisation } from "../../localisation";
import { useGlobalLoading } from "../../loading/GlobalLoadingContext";
import "./LoginPage.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { t } = useLocalisation();
  const { showError, showValidationWarning, dismissModal } = useAppModal();
  const { runWithLoading, isLoading } = useGlobalLoading();
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (user) return <Navigate to="/home" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dismissModal();

    if (!accountId.trim() || !password) {
      showValidationWarning(t("login.validationBoth")); 
      return;
    }

    await runWithLoading(async () => {
      const res = await window.electronAPI.auth.login({ accountId, password });
      if (!res.ok) {
        showError(res.code);
        return;
      }
      login(res.user);
      navigate("/home");
    });
  }

  return (
    <div className="login-page">
      <div className="login-page__toolbar">
        <SettingsButton onClick={() => setSettingsOpen(true)} />
      </div>
      {settingsOpen ? <SettingModal onClose={() => setSettingsOpen(false)} /> : null}
      <LoginCardForm title={t("login.title")}>
        <form className="login-page__form" noValidate onSubmit={handleSubmit}>
          <LabelField labelName={t("login.accountId")} required>
            <TextInput value={accountId} onChange={(e) => setAccountId(e.target.value)} autoComplete="username" />
          </LabelField>
          <LabelField labelName={t("login.password")} required>
            <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </LabelField>
          <LoginButton type="submit" disabled={isLoading}>
            {t("login.submit")}
          </LoginButton>
        </form>
      </LoginCardForm>
    </div>
  );
}
