import {
  cleanup,
  render,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import React from "react";
import App from "../App";
import Clock from "../Clock";

/* tests 
  - maintains correct order after deleting a clock
*/

describe("App:", () => {
  beforeEach(() => {
    const mockDate = new Date("December 17, 1995 03:24:01");
    jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockDate as unknown as string);
  });
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  test("renders everything", async () => {
    const { findByTestId, findByRole } = render(<App />);

    await findByTestId("clock");
    await findByTestId("timeface");
    await findByTestId("city-select");
    await findByRole("button", { name: /X/i });
    await findByRole("button", { name: /add new/i });
  });

  test("clicking on delete button deletes a clock", async () => {
    const { findByRole, queryByTestId } = render(<App />);

    const deleteButton = await findByRole("button", { name: /X/i });
    fireEvent.click(deleteButton);

    expect(queryByTestId("clock")).toBeNull();
  });

  test("clicking on add button adds new clock", async () => {
    const { findByRole, queryAllByTestId } = render(<App />);

    const addButton = await findByRole("button", { name: /add new/i });
    fireEvent.click(addButton);

    expect(queryAllByTestId("clock").length).toEqual(2);
    for (var i = 0; i < 10; i++) fireEvent.click(addButton);
    expect(queryAllByTestId("clock").length).toEqual(12);
  });

  test("changing the country changes clock to the correct time", async () => {
    const timeZone = "Australia/Sydney";
    const timeString = new Date().toLocaleTimeString("en-us", {
      timeStyle: "medium",
      timeZone,
    });

    const { findByTestId } = render(<App />);

    const citySelect = (await findByTestId("city-select")) as HTMLSelectElement;
    fireEvent.change(citySelect, { target: { value: timeZone } });

    const { findByText } = within(await findByTestId("clock"));
    await findByText(timeString);
  });

  test("renders hands on the timeface at correct angles", async () => {
    const { container, findByTestId } = render(<App />);
    const hands = (await findByTestId("timeface"))
      .children as unknown as Array<HTMLElement>;

    //change time zone to update children components (because date is mocked so no auto rerenders)
    const citySelect = (await findByTestId("city-select")) as HTMLSelectElement;
    fireEvent.change(citySelect, { target: { value: "Australia/Sydney" } });

    await waitFor(() => {
      expect(hands[0].style.transform).toBe("rotateZ(102deg)");
      expect(hands[1].style.transform).toBe("rotateZ(144deg)");
      expect(hands[2].style.transform).toBe("rotateZ(6deg)");
    });
  });
});
