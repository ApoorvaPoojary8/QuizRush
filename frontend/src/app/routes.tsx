import { createBrowserRouter } from "react-router";
import { Welcome } from "./screens/Welcome";
import { Signup } from "./screens/Signup";
import { Login } from "./screens/Login";
import { JoinGame } from "./screens/JoinGame";
import { QuizQuestion } from "./screens/QuizQuestion";
import { LiveScore } from "./screens/LiveScore";
import { QuizResult } from "./screens/QuizResult";
import { CreateQuiz } from "./screens/CreateQuiz";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Welcome,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/join",
    Component: JoinGame,
  },
  {
    path: "/quiz",
    Component: QuizQuestion,
  },
  {
    path: "/score",
    Component: LiveScore,
  },
  {
    path: "/result",
    Component: QuizResult,
  },
  {
    path: "/create",
    Component: CreateQuiz,
  },
]);