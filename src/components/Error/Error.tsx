import React from "react";
import styles from "./Error.module.css";
export const Error = ({ message }: { message: string }) => {
  return (
    <section className={styles.error}>
      <h1>An Error has been caught</h1>
      <div data-testid="error"> {message}</div>
    </section>
  );
};
