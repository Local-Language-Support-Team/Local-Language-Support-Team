import { render } from "@testing-library/react";
import { Message, MessageType } from "types/index";
import Home, { CMessage } from "./home";

describe("Home page", () => {
  it("renders Hello World component", () => {
    render(<Home />);
  });
});

describe("CMessage component", () => {
  const exampleMessage: Message<MessageType.TEXT> = {
    id: "1",
    content: "Hello World",
    creatorId: "SERVER",
    type: MessageType.TEXT,
  };

  it("renders CMessage component", () => {
    render(<CMessage message={exampleMessage} />);
  });

  it("renders CMessage component with type VIEW_ORDERS", () => {
    const viewOrdersMessage: Message<MessageType.VIEW_ORDERS> = {
      id: "1",
      content: "Hello World",
      creatorId: "SERVER",
      type: MessageType.VIEW_ORDERS,
    };

    render(<CMessage message={viewOrdersMessage} />);
  });
});
