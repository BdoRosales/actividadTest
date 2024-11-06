import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Alert } from "react-native";
import Index from "../../app/regisster";

//Mock the Alert module
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

describe("Index", () => {
  it("renders correctly", () => {
    render(<Index />);
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText("Iniciar sesión")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
    expect(screen.getByTestId("icon-image")).toBeTruthy();
  });

  it("validates email", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Email");
    const button = screen.getByText("Iniciar sesión");
    fireEvent.changeText(emailInput, "user@");
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "introduce un email válido."
    );
  });

  it("validates password", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const button = screen.getByText("Iniciar sesión");
    fireEvent.changeText(emailInput, "user@test.com");
    fireEvent.changeText(passwordInput, "password");
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "La contraseña debe tener al menos 8 caracteres, mayúscula, número y carácter especial."
    );
  });
});

it("validates email", () => {
  render(<Index />);
  const emailInput = screen.getByPlaceholderText("Email");
  const button = screen.getByText("Iniciar sesión");
  fireEvent.changeText(emailInput, "user@");
  fireEvent.press(button);
  expect(Alert.alert).toHaveBeenCalledWith(
    "Error",
    "introduce un email válido."
  );
});

it("validates password", () => {
  render(<Index />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const button = screen.getByText("Iniciar sesión");
  fireEvent.changeText(emailInput, "user@test.com");
  fireEvent.changeText(passwordInput, "password");
  fireEvent.press(button);
  expect(Alert.alert).toHaveBeenCalledWith(
    "Error",
    "La contraseña debe tener al menos 8 caracteres, mayúscula, número y carácter especial."
  );
});

it("submits the form", () => {
  render(<Index />);
  const emailInput = screen.getByPlaceholderText("Email");
  const passwordInput = screen.getByPlaceholderText("Password");
  const button = screen.getByText("Iniciar sesión");
  fireEvent.changeText(emailInput, "user@test.com");
  fireEvent.changeText(passwordInput, "Password1!");
  fireEvent.press(button);
  expect(Alert.alert).toHaveBeenCalledWith("Éxito", "Login correcto");
});
