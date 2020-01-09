export const deviceMessagesSubscription = name => `
  subscription PublishedMessage {
        publishedDeviceMessage(device: "${name}") {
            test_data
            device
        }
    }
`;
