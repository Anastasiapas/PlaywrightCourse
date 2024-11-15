import { test, expect} from "../fixtures/fixtures";
import { GaragePage } from "../pages/garagePage";

test.describe("Verify user can be registered", async () => {
  const mileage = "40000";

  test("Verify a car can be added ", async ({ page, loggedInUser, cleanUp }) => {
    const garagePage = new GaragePage(page);
    await garagePage.addCar(mileage);
    await expect(garagePage.elements.get("carsList")).toBeVisible();
  });


});
