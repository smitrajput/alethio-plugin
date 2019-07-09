const plugin = {
    init(config, api, logger, publicPath) {
        __webpack_public_path__ = publicPath;

        // Add module, page definitions and others here
        api.addModuleDef("module://aleth.io/pay-no-load/profile", {
            // We don't use context for now, so it's an empty object
            contextType: {},
            // The React component is loaded asynchronously and then cached by the CMS until a full page reload
            // It can either be a component class or a functional component
            getContentComponent: async () => (props) => <div>Hello, {props.name}!</div>

            // getContentComponent: async () => (props) => console.log('hi')
            ,
            // We receive some props from the cms and we map them to the props that our component needs
            getContentProps: cmsProps => ({ name: "Joe" })
        });

        api.addPageDef("page://aleth.io/pay-no-load/profile", {
            contextType: {},
            paths: {
                // We'll map the page to an application path. The left-hand side is a react-router path expression.
                // The right hand side receives params extracted from the path expression and
                // resolves to an empty context object, which we won't use for now
                "/profile": params => ({})
            },
            // Function that resolves to a React component class/ functional component. It can also be async.
            getPageTemplate: () => ({ slots }) => <div>
            <h1>User profile</h1>
            { /* We'll define a single named slot ("content"), where the CMS will inject our module */ }
            { slots && slots["content"] }
        </div>
            // getPageTemplate: () => ({ slots }) => console.log('bye')
        });
    },

    getAvailableLocales() {
        return ["en-US"];
    },

    async loadTranslations(locale) {
        return await import("./translation/" + locale + ".json");
    }
};

export default plugin;
