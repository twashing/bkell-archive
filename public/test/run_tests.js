
phantom.injectJs("public/test/test_core.js")
phantom.injectJs("public/test/test_register.js")

jasmine.getEnv().addReporter("ConsoleReporter")
jasmine.getEnv().execute();

phantom.exit()

