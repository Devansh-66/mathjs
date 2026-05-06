#!/usr/bin/env bash
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

MOCHA="./node_modules/.bin/mocha"

case "$MODE" in
  base)
    $MOCHA \
      --recursive \
      --reporter mocha-junit-reporter \
      --reporter-options "$REPORTER_OPTS" \
      --ignore 'test/unit-tests/function/statistics/kurtosis.test.js' \
      test/unit-tests
    ;;
  new)
    $MOCHA \
      --reporter mocha-junit-reporter \
      --reporter-options "$REPORTER_OPTS" \
      test/unit-tests/function/statistics/kurtosis.test.js
    ;;
  *)
    echo "Unknown mode: $MODE" >&2
    exit 2
    ;;
esac
