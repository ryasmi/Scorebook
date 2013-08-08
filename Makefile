REPORTER = spec
test:
	./node_modules/.bin/mocha --reporter $(REPORTER) && \
	./node_modules/.bin/grunt

.PHONY: test