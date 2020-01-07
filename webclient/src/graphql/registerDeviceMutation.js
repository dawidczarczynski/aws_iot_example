export const registerDeviceMutation = name => `
    mutation CreateDevice {
        createDevice(name: "${name}") {
            name
            arn
        }
    }
`;
