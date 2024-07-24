type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
};

type ModalState = {
  isOpen: boolean;
  type:
    | "login"
    | "register"
    | "add-property"
    | "edit-property"
    | "confirm"
    | null;
};

type ConfirmState = {
  title: string;
  message: string;
  confirmType: "add-reservation" | null;

  reservationFormData: {
    property: string;
    check_in: string;
    check_out: string;
    guests: number;
  };
};

type LoginArgs = {
  email: string;
  password: string;
};

type RegisterArgs = {
  name: string;
  email: string;
  password: string;
  re_password: string;
};

type getPropertiesArgs = {
  page?: string;
  name?: string;
  id?: string;
};

export type {
  AuthState,
  LoginArgs,
  RegisterArgs,
  getPropertiesArgs,
  ModalState,
  ConfirmState,
};
