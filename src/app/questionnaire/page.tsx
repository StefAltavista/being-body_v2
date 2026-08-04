import type { Metadata } from "next";
import QuestionnaireForm from "@/components/Form.Questionnaire";
import styles from "./questionnaire.module.css";

export const metadata: Metadata = {
  title: "Wellness Questionare | Being Body",
  description: "Private wellness questionnaire for Being Body clients.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function QuestionnairePage() {
  return (
    <main className={styles.page}>
      <div className={styles.decorativeCircleOne} aria-hidden="true" />
      <div className={styles.decorativeCircleTwo} aria-hidden="true" />
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Private client form</p>
        <h1>Wellness Questionare</h1>
        <p className={styles.intro}>
          This information helps me prepare a thoughtful and comfortable session
          for you.
        </p>
      </header>
      <QuestionnaireForm />
    </main>
  );
}
