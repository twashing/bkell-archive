
phantom.injectJs("public/test/test_core.js")
phantom.injectJs("public/test/test_register.js")

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter())
jasmine.getEnv().addReporter(new jasmine.TrivialReporter())
jasmine.getEnv().execute()

phantom.exit()

