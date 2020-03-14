.PHONY:doc clean

all:doc

doc:
	$(MAKE) -C doc/ html
clean:
	$(MAKE) -C doc/ clean
