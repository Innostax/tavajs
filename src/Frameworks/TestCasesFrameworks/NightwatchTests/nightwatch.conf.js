const BASE_URL = "Application's frontend base url";

module.exports = {
    src_folders: ["tests"],
    output_folder: false,
    page_objects_path: "",
    custom_commands_path: "",
    custom_assertions_path: "",
    globals_path: "",
    webdriver: {},

    test_workers: {
        enabled: true,
    },

    test_settings: {
        default: {
            disable_error_log: false,
            launch_url: BASE_URL,

            screenshots: {
                enabled: false,
                path: "screens",
                on_failure: true,
            },

            desiredCapabilities: {
                browserName: "chrome",
            },

            webdriver: {
                start_process: true,
                server_path: "",
            },

        },

        chrome: {
            desiredCapabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    w3c: true,
                },
            },

            webdriver: {
                start_process: true,
                server_path: "",
            },
        },

    },

    usage_analytics: {
        enabled: false,
        log_path: "./logs/analytics",
        client_id: "c68bae19-25a7-4e9e-80a2-d187f235d55f",
    },
};
