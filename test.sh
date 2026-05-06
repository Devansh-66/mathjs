#!/usr/bin/env bash
# Mars Challenge test harness.
#
# Usage:
#   ./test.sh --output_path <path> base   # regression: existing test suite, JUnit XML
#   ./test.sh --output_path <path> new    # new tests: kurtosis.test.js, JUnit XML
#
# Exit code 0 only when the selected suite passes.

set -u

OUTPUT_PATH=""
MODE=""

while [ $# -gt 0 ]; do
  case "$1" in
    --output_path)
      OUTPUT_PATH="$2"
      shift 2
      ;;
    base|new)
      MODE="$1"
      shift
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 2
      ;;
  esac
done

if [ -z "$OUTPUT_PATH" ] || [ -z "$MODE" ]; then
  echo "Usage: $0 --output_path <path> {base|new}" >&2
  exit 2
fi

cd "$(dirname "$0")"

REPORTER_OPTS="mochaFile=${OUTPUT_PATH}"

case "$MODE" in
  base)
    # Existing regression suite -- every test EXCEPT the new kurtosis tests.
    npx mocha \
      --recursive \
      --reporter mocha-junit-reporter \
      --reporter-options "$REPORTER_OPTS" \
      --ignore 'test/unit-tests/function/statistics/kurtosis.test.js' \
      test/unit-tests
    ;;
  new)
    # The Mars test patch -- only the kurtosis tests.
    npx mocha \
      --reporter mocha-junit-reporter \
      --reporter-options "$REPORTER_OPTS" \
      test/unit-tests/function/statistics/kurtosis.test.js
    ;;
  *)
    echo "Unknown mode: $MODE" >&2
    exit 2
    ;;
esac
