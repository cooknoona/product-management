export type WarningModalActionVariant = 'primary' | 'secondary'

/** 경고 모달 하단 버튼 한 개(검증용 확인) 또는 여러 개(취소/삭제 등 선택) */
export type WarningModalAction = {
  label: string
  onClick: () => void | Promise<void>
  variant?: WarningModalActionVariant
}

export type WarningModalContentProps = {
  message: string
  /** 미지정 시 단일 「확인」버튼(닫기만) */
  actions?: WarningModalAction[]
}
