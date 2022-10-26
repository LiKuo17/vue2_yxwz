const context = require.context("@/components/svgs", true, /.vue$/);
export default {
    install(app) {
        context.keys().forEach(componentPath => {
            let splitPart1 = componentPath.split("/");
            app.component(splitPart1[splitPart1.length - 1].split(".vue")[0], context(componentPath).default);
        })
    }
}