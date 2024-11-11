import { test, expect } from "@playwright/test";

test.describe('Mock user"s profile', () => {
  test.beforeEach(async ({ request }) => {
    const authRequest = await request.post("/api/auth/signin", {
      data: {
        email: "pasichnyk.nas23+678@gmail.com",
        password: "12345Rr!",
        remember: true,
      },
    });
  });

  test('Verify user"s profile replacement', async ({ page }) => {
    const mockedData = {
      name: "New",
      lastName: "Name",
    };

    await page.route("/api/users/profile", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockedData),
      });
    });

    await page.goto("https://qauto.forstudy.space/panel/profile");
    const response = await page.waitForResponse("/api/users/profile");

    const data = await response.json();
    expect(data.name).toBe("New");
    expect(data.lastName).toBe("Name");
  });
});
