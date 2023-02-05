import { test, expect } from "@playwright/test";

const HOST_URL_TEST = "http://localhost:5173/home";
// const HOST_URL_TEST = "http://hackathon-cohere.netlify.app/home";

test.beforeEach(async ({ page }) => {
  await page.goto(HOST_URL_TEST);
});

test.describe("Load page", () => {
  test("has title", async ({ page }) => {
    // Expects
    await expect(page).toHaveTitle(/Hackathon Midudev/);
  });

  test("has headers and contents", async ({ page }) => {
    // expects
    await expect(
      page.getByRole("heading", { name: "COHERE Example" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "COHERE Response" })
    ).toBeVisible();

    await expect(page.getByTestId("titleOption")).toBeVisible();
    await expect(page.getByTestId("exampleOption")).toBeVisible();

    await expect(page.getByTestId("inputOption")).toBeVisible();

    await expect(page.getByTestId("labelError")).toBeVisible();

    await expect(page.getByRole("button", { name: "RUN" })).toBeVisible();
    await expect(page.getByRole("button", { name: "CLEAR" })).toBeVisible();

    await expect(page.getByTestId("responseArea")).toBeEmpty();
  });
});

test.describe("Option generate type", () => {
  test("press button run option generate type", async ({ page }) => {
    // click select
    await page.getByTestId("typeAI").click();
    // select option
    await page
      .getByRole("option", { name: "Generate - Correct Transcription" })
      .click();
    // create a input locator
    const input = page.getByTestId("inputOption");
    // add text of input
    await input.fill("I am balling into hay to read port missing credit card.");
    // click button run
    const button = await page.getByRole("button", { name: /run/i });
    await button.click();
    // expects
    await expect(page.getByTestId("responseArea")).not.toBeEmpty();
  });

  test("press button clear after button run option generate type", async ({
    page,
  }) => {
    // click select
    await page.getByTestId("typeAI").click();
    // select option
    await page
      .getByRole("option", { name: "Generate - Correct Transcription" })
      .click();
    // create a input locator
    const input = page.getByTestId("inputOption");
    // add text of input
    await input.fill("I am balling into hay to read port missing credit card.");
    // click button run
    const buttonRun = await page.getByRole("button", { name: /run/i });
    await buttonRun.click();
    // click button clear
    const buttonClear = await page.getByRole("button", { name: /clear/i });
    await buttonClear.click();
    // expects
    await expect(page.getByTestId("inputOption")).toBeEmpty();
    await expect(page.getByTestId("responseArea")).toBeEmpty();
  });
});

test.describe("Option classify type", () => {
  test("press button run option classify type", async ({ page }) => {
    // click select
    await page.getByTestId("typeAI").click();
    // select option
    await page
      .getByRole("option", { name: "Classify - Headline Market Analysis" })
      .click();
    // create a input locator
    const input = page.getByTestId("inputText");
    // add text of input
    await input.fill(
      "As Gas Prices Went Up, So Did the Hunt for Electric Vehicles."
    );
    // click button add classify
    const buttonAdd = page.getByTestId("btnAddClassify");
    await buttonAdd.click();
    // click button run
    const button = await page.getByRole("button", { name: /run/i });
    await button.click();
    // expects
    await expect(page.getByTestId("responseArea")).not.toBeEmpty();
  });

  test("press button clear after button run option classify type", async ({
    page,
  }) => {
    // click select
    await page.getByTestId("typeAI").click();
    // select option
    await page
      .getByRole("option", { name: "Classify - Headline Market Analysis" })
      .click();
    // create a input locator
    const input = page.getByTestId("inputText");
    // add text of input
    await input.fill("I am balling into hay to read port missing credit card.");
    // click button add
    const buttonAdd = page.getByTestId("btnAddClassify");
    await buttonAdd.click();
    // click button run
    const buttonRun = await page.getByRole("button", { name: /run/i });
    await buttonRun.click();
    // click button clear
    const buttonClear = await page.getByRole("button", { name: /clear/i });
    await buttonClear.click();
    // expects
    await expect(page.getByTestId("inputText")).toBeEmpty();
    await expect(page.getByTestId("listInput")).toBeEmpty();
    await expect(page.getByTestId("responseArea")).toBeEmpty();
  });

  test("press button add and delete option classify type", async ({ page }) => {
    // click select
    await page.getByTestId("typeAI").click();
    // select option
    await page
      .getByRole("option", { name: "Classify - Headline Market Analysis" })
      .click();
    // create a input locator
    const input = page.getByTestId("inputText");
    // add text of input
    await input.fill(
      "As Gas Prices Went Up, So Did the Hunt for Electric Vehicles."
    );
    // click button add
    const buttonAdd = page.getByTestId("btnAddClassify");
    await buttonAdd.click();
    // click button del
    const buttonDel = page.getByTestId("btnDelClassify0");
    await buttonDel.click();
    // expects
    await expect(page.getByTestId("listInput")).toBeEmpty();
  });
});

test.describe("Button clear", () => {
  test("press button option generate type", async ({ page }) => {
    // click select
    await page.getByTestId("typeAI").click();
    // select option
    await page
      .getByRole("option", { name: "Generate - Correct Transcription" })
      .click();
    const button = await page.getByRole("button", { name: /clear/i });
    const disabled: boolean = await button.isDisabled();
    if (disabled) {
      button.evaluate((node) => node.removeAttribute("disabled"));
    }
    // click button clear
    await button.click();
    // expects
    await expect(page.getByTestId("inputOption")).toBeEmpty();
    await expect(page.getByTestId("responseArea")).toBeEmpty();
  });

  test("press button option classify type", async ({ page }) => {
    // click select
    await page.getByTestId("typeAI").click();
    // select option
    await page
      .getByRole("option", { name: "Classify - Headline Market Analysis" })
      .click();
    const button = await page.getByRole("button", { name: /clear/i });
    const disabled: boolean = await button.isDisabled();
    if (disabled) {
      button.evaluate((node) => node.removeAttribute("disabled"));
    }
    // click button clear
    await button.click();
    // expects
    await expect(page.locator("input#inputText")).toBeEmpty();
    await expect(page.getByTestId("listInput")).toBeEmpty();
    await expect(page.getByTestId("responseArea")).toBeEmpty();
  });
});
