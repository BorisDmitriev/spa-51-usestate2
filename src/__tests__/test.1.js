/* eslint-disable testing-library/prefer-screen-queries */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

import React from "react";
import TodoList from "../components/TodoList";

describe("ToDo-Liste", () => {
    it("kann ein Todo hinzufügen und löschen", () => {
        const { getByText, getByPlaceholderText, queryByText } = render(
            <TodoList />
        );
        const input = getByPlaceholderText("Neues Todo hinzufügen");

        // Füge ein neues Todo hinzu
        fireEvent.change(input, { target: { value: "Test Todo" } });
        fireEvent.submit(input);

        // Überprüfe, ob das neue Todo in der Liste ist
        const todo = getByText("Test Todo");
        expect(todo).toBeInTheDocument();

        // Lösche das Todo
        const deleteButton = getByText("Löschen");
        fireEvent.click(deleteButton);

        // Überprüfe, ob das Todo nicht mehr in der Liste ist
        const deletedTodo = queryByText("Test Todo");
        expect(deletedTodo).not.toBeInTheDocument();
    });

    it("kann ein Todo bearbeiten", () => {
        const { getByText, getByPlaceholderText } = render(<TodoList />);
        const input = getByPlaceholderText("Neues Todo hinzufügen");

        // Füge ein neues Todo hinzu
        fireEvent.change(input, { target: { value: "Test Todo" } });
        fireEvent.submit(input);

        // Bearbeite das Todo
        const editButton = getByText("Bearbeiten");
        fireEvent.click(editButton);

        const editInput = getByPlaceholderText(/bearbeiten/i);
        fireEvent.change(editInput, { target: { value: "Geändertes Todo" } });
        const saveButton = getByText("Speichern");
        fireEvent.click(saveButton);

        // Überprüfe, ob das Todo mit dem neuen Text angezeigt wird
        const editedTodo = getByText("Geändertes Todo");
        expect(editedTodo).toBeInTheDocument();
    });
});
