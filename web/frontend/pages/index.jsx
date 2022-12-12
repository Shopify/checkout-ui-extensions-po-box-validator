import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Heading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";

import { trophyImage } from "../assets";


export default function HomePage() {
  return (
    <Page narrowWidth>
      <TitleBar title="Max Validation" primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Heading>Welcome to your PO Box Validations Checkout Extension app!</Heading>
                  <p>
                    This is a custom checkout extension app designed to validate the shipping address and prevent the use of PO Boxes.
                  </p>
                  <p>
                    If you are ready to get started, navigate to your store <strong>Settings</strong> &gt; <strong>Checkout and account</strong> &gt; and proceed to the <strong>Checkout Editor</strong>.
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt="Welcome to your Validations Checkout Extension app"
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
