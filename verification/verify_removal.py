from playwright.sync_api import sync_playwright, expect
import os

def test_removal(page):
    # Load the local index.html file
    path = os.path.abspath("index.html")
    page.goto(f"file://{path}")

    # Check that the removed items are NOT in the DOM
    expect(page.get_by_text("Tom’s Friend in African Dress")).not_to_be_attached()
    expect(page.get_by_text("Tom’s Friend", exact=True)).not_to_be_attached()
    expect(page.get_by_text("No Stranger to War")).not_to_be_attached()
    expect(page.get_by_text("Olive Groves and Hill Towns in the Marche")).not_to_be_attached()

    # Take a screenshot of the gallery area (where some of these were)
    # Scrolling to a known location near where they were
    page.get_by_text("Recent Work").scroll_into_view_if_needed()
    page.screenshot(path="verification/gallery_top.png")

    page.get_by_text("Previous Work").scroll_into_view_if_needed()
    page.screenshot(path="verification/gallery_previous.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_removal(page)
            print("Verification successful: Items removed from DOM.")
        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()
