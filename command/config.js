const path = require('path');

const SRC_VIEWS = `${process.cwd()}/src/views`;
const SRC_VIEWS_ORDER = `${SRC_VIEWS}/unifiedOrder`;
const SRC_STEP_COMMON_DIR = `${SRC_VIEWS_ORDER}/stepCommon`;
const SRC_ORDER_TYPE_LSIT = `${SRC_VIEWS_ORDER}/typeList`;

const TEMPLATE_DIR = path.resolve(__dirname + '/../template');
const TEMPLATE_ORDER = `${TEMPLATE_DIR}/unifiedOrder`;
const TEMPLATE_STEP_COMMON_DIR = `${TEMPLATE_ORDER}/StepCommon`;
const TEMPLATE_OP_FAULT = `${TEMPLATE_ORDER}/opFault`;

module.exports = Object.freeze({
    SRC_VIEWS,
    SRC_VIEWS_ORDER,
    SRC_STEP_COMMON_DIR,
    SRC_ORDER_TYPE_LSIT,

    TEMPLATE_DIR,
    TEMPLATE_ORDER,
    TEMPLATE_STEP_COMMON_DIR,
    TEMPLATE_OP_FAULT,
});