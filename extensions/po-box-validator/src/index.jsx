import {
  render,
  Banner,
  BlockStack,
  useExtensionCapability,
  useBuyerJourneyIntercept,
  useShippingAddress,
  useTranslate,
} from "@shopify/checkout-ui-extensions-react";
import React, { useState } from "react";

// Set the entry point for the extension
render("Checkout::DeliveryAddress::RenderBefore", () => <App />);

function App() {
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  const translate = useTranslate();
  const poBoxErrorMsg = translate("poBoxError");
  const pattern = /\bP(ost|ostal)?([ \.]*(O|0)(ffice)?)?([ \.]*Box)\b/ig;

  let address = useShippingAddress();
  let streetAddress = address?.address1 ?? 'No address';
  let isPoBox = pattern.test(streetAddress);

  // Merchants can toggle the `block_progress` capability behavior within the checkout editor
  // To give the best preview experience, ensure that your extension updates its UI accordingly
  // For this example, the extension subscribes to `capabilities`, and updates the `label` and `required` attributes for the `TextField` component
  const canBlockProgress = useExtensionCapability("block_progress");

  if (canBlockProgress && isPoBox && !showErrorBanner) {
    setShowErrorBanner(true);
  } else if (canBlockProgress && !isPoBox && showErrorBanner) {
    setShowErrorBanner(false);
  }

  // Use the `buyerJourney` intercept to conditionally block checkout progress
  // The ability to block checkout progress isn't guaranteed.
  // Refer to the "Checking for the ability to block checkout progress" section for more information.
  useBuyerJourneyIntercept(() => {
    // Validate that the address is not a PO Box
    if (isPoBox) {
      return {
        behavior: "block",
        reason: "Can't ship to PO Boxes",
        perform: (result) => {
          // If we were able to block progress, set a validation error
          if (result.behavior === "block") {
            setShowErrorBanner(true);
          }
        }
      };
    }

    return {
      behavior: "allow",
      perform: () => {
        // Ensure any errors are hidden
        setShowErrorBanner(false);
      },
    };
  });

  // Render the extension
  return (
    <BlockStack>
      {showErrorBanner && (
        <Banner status="critical">
          {poBoxErrorMsg}
        </Banner>
      )}
    </BlockStack>
  );
}
