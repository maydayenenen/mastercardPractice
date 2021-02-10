import { render, screen, waitFor, within } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import App from "../App";
import userEvent from "@testing-library/user-event";
import mockUserData from "./mockUserData";
import mockRepoData from "./mockRepoData";

const server = setupServer(
  rest.get("https://api.github.com/search/users", (req, resp, ctx) => {
    return resp(ctx.json(mockUserData));
  }),
  rest.get("https://api.github.com/users/:userName/repos", (req, resp, ctx) => {
    return resp(ctx.json(mockRepoData));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Test App", () => {
  it("should render the App", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it("should render a title", () => {
    const { getByRole } = render(<App />);
    const title = getByRole("heading", { name: "Github repo search" });
    expect(title).toBeInTheDocument();
  });

  it("should render a input box", () => {
    const { getByPlaceholderText } = render(<App />);
    const input = getByPlaceholderText("type a user name");
    expect(input).toBeInTheDocument();
  });

  describe("should allow searching and display user and repo", () => {
    beforeEach(async () => {
      const { getByPlaceholderText, getByTestId, queryByTestId } = render(
        <App />
      );
      const input = getByPlaceholderText("type a user name");
      userEvent.type(input, "mojombo");
      await waitFor(() => expect(getByTestId("loader")).toBeInTheDocument());
      await waitFor(() => expect(queryByTestId("loader")).toBeNull());
    });
    it("should render the avatar of user with username as alt text", () => {
      const img = screen.getByAltText("mojombo");
      expect(img.tagName).toBe("IMG");
      expect(img).toBeInTheDocument();
    });
    it("should render a user name", () => {
      const userName = screen.getByRole("heading", { name: "mojombo" });
      expect(userName).toBeInTheDocument();
    });
    it("should render a list of repo cards", () => {
      const grid = document.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      const cardTitles = within(grid).getAllByRole("heading");
      expect(cardTitles).toHaveLength(mockRepoData.length);
      expect(cardTitles.map((t) => t.textContent)).toEqual(
        mockRepoData.map((r) => r.full_name)
      );
    });
  });
});
