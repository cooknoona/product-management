import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { StandardButton } from "../../common/buttons";
import { LabelField } from "../../common/fields";
import { LoginCardForm } from "../../common/forms";
import { TextInput } from "../../common/inputs";
import { useAppModal } from "../../errors/AppModalContext";
import { useGlobalLoading } from "../../loading/GlobalLoadingContext";
import "./LoginPage.css";

export function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const { showError, showValidationWarning, dismissModal } = useAppModal();
  const { runWithLoading, isLoading } = useGlobalLoading();
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");

  if (user) return <Navigate to="/home" replace />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dismissModal();

    if (!accountId.trim() || !password) {
      showValidationWarning("아이디와 비밀번호를 모두 입력해 주세요."); 
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
      <LoginCardForm title="로그인">
        <form className="login-page__form" noValidate onSubmit={handleSubmit}>
          <LabelField labelName="아이디" required>
            <TextInput value={accountId} onChange={(e) => setAccountId(e.target.value)} autoComplete="username" />
          </LabelField>
          <LabelField labelName="비밀번호" required>
            <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </LabelField>
          <StandardButton type="submit" disabled={isLoading}>
            로그인
          </StandardButton>
        </form>
      </LoginCardForm>
    </div>
  );
}
