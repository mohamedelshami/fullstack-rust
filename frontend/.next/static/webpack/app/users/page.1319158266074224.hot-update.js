"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/users/page",{

/***/ "(app-pages-browser)/./src/components/app/UsersTable.tsx":
/*!*******************************************!*\
  !*** ./src/components/app/UsersTable.tsx ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\nconst ClientUsersTable = ()=>{\n    _s();\n    const [users, setUsers] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        fetch(\"http://127.0.0.1:8080/users\", {\n        }).then((response)=>{\n            if (!response.ok) {\n                throw new Error(\"Network response was not ok\");\n            }\n            return response.json();\n        }).then((data)=>setUsers(data)).catch((error)=>setError(error));\n    }, []);\n    if (error) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: [\n                \"Error: \",\n                error.message\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n            lineNumber: 36,\n            columnNumber: 12\n        }, undefined);\n    }\n    if (!users) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Loading...\"\n        }, void 0, false, {\n            fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n            lineNumber: 40,\n            columnNumber: 12\n        }, undefined);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Users\"\n            }, void 0, false, {\n                fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                lineNumber: 45,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                className: \"border border-sky-500\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                        className: \"border border-sky-500\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                            className: \"border border-sky-500\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"User ID\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                    lineNumber: 49,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Name\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                    lineNumber: 50,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                    children: \"Balance\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                    lineNumber: 51,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                            lineNumber: 48,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                        className: \"border border-sky-500\",\n                        children: users.map((user)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                className: \"border border-sky-500\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                            href: \"/user_details/\".concat(user.user_id),\n                                            children: user.user_id\n                                        }, void 0, false, {\n                                            fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                            lineNumber: 58,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    }, void 0, false, {\n                                        fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                        lineNumber: 57,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: user.name\n                                    }, void 0, false, {\n                                        fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                        lineNumber: 63,\n                                        columnNumber: 15\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                        children: user.balance\n                                    }, void 0, false, {\n                                        fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                        lineNumber: 64,\n                                        columnNumber: 15\n                                    }, undefined)\n                                ]\n                            }, user._id.$oid, true, {\n                                fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                                lineNumber: 56,\n                                columnNumber: 13\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                        lineNumber: 54,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n                lineNumber: 46,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/melshami/fika/tocos/carbon-sim/frontend/src/components/app/UsersTable.tsx\",\n        lineNumber: 44,\n        columnNumber: 5\n    }, undefined);\n};\n_s(ClientUsersTable, \"mqgyyCKBocqX2OOs40UBlqsnoVk=\");\n_c = ClientUsersTable;\n/* harmony default export */ __webpack_exports__[\"default\"] = (ClientUsersTable);\nvar _c;\n$RefreshReg$(_c, \"ClientUsersTable\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2FwcC9Vc2Vyc1RhYmxlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUM2QjtBQUNzQjtBQVluRCxNQUFNSSxtQkFBNkI7O0lBQ2pDLE1BQU0sQ0FBQ0MsT0FBT0MsU0FBUyxHQUFHSiwrQ0FBUUEsQ0FBaUI7SUFDbkQsTUFBTSxDQUFDSyxPQUFPQyxTQUFTLEdBQUdOLCtDQUFRQSxDQUFlO0lBRWpEQyxnREFBU0EsQ0FBQztRQUNSTSxNQUFNLCtCQUErQjtRQUlyQyxHQUNHQyxJQUFJLENBQUMsQ0FBQ0M7WUFDTCxJQUFJLENBQUNBLFNBQVNDLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNO1lBQ2xCO1lBQ0EsT0FBT0YsU0FBU0csSUFBSTtRQUN0QixHQUNDSixJQUFJLENBQUMsQ0FBQ0ssT0FBU1QsU0FBU1MsT0FDeEJDLEtBQUssQ0FBQyxDQUFDVCxRQUFVQyxTQUFTRDtJQUMvQixHQUFHLEVBQUU7SUFFTCxJQUFJQSxPQUFPO1FBQ1QscUJBQU8sOERBQUNVOztnQkFBSTtnQkFBUVYsTUFBTVcsT0FBTzs7Ozs7OztJQUNuQztJQUVBLElBQUksQ0FBQ2IsT0FBTztRQUNWLHFCQUFPLDhEQUFDWTtzQkFBSTs7Ozs7O0lBQ2Q7SUFFQSxxQkFDRSw4REFBQ0E7OzBCQUNDLDhEQUFDRTswQkFBRzs7Ozs7OzBCQUNKLDhEQUFDQztnQkFBTUMsV0FBVTs7a0NBQ2YsOERBQUNDO3dCQUFNRCxXQUFVO2tDQUNmLDRFQUFDRTs0QkFBR0YsV0FBVTs7OENBQ1osOERBQUNHOzhDQUFHOzs7Ozs7OENBQ0osOERBQUNBOzhDQUFHOzs7Ozs7OENBQ0osOERBQUNBOzhDQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztrQ0FHUiw4REFBQ0M7d0JBQU1KLFdBQVU7a0NBQ2RoQixNQUFNcUIsR0FBRyxDQUFDLENBQUNDLHFCQUNWLDhEQUFDSjtnQ0FBR0YsV0FBVTs7a0RBQ1osOERBQUNPO2tEQUNDLDRFQUFDNUIsa0RBQUlBOzRDQUFDNkIsTUFBTSxpQkFBOEIsT0FBYkYsS0FBS0csT0FBTztzREFDdENILEtBQUtHLE9BQU87Ozs7Ozs7Ozs7O2tEQUlqQiw4REFBQ0Y7a0RBQUlELEtBQUtJLElBQUk7Ozs7OztrREFDZCw4REFBQ0g7a0RBQUlELEtBQUtLLE9BQU87Ozs7Ozs7K0JBUndCTCxLQUFLTSxHQUFHLENBQUNDLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlcEU7R0F4RE05QjtLQUFBQTtBQTBETiwrREFBZUEsZ0JBQWdCQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL2FwcC9Vc2Vyc1RhYmxlLnRzeD81OGQ2Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuLy8gRGVmaW5lIFR5cGVTY3JpcHQgaW50ZXJmYWNlc1xuaW50ZXJmYWNlIElVc2VyIHtcbiAgX2lkOiB7XG4gICAgJG9pZDogc3RyaW5nO1xuICB9O1xuICB1c2VyX2lkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgYmFsYW5jZTogbnVtYmVyO1xufVxuXG5jb25zdCBDbGllbnRVc2Vyc1RhYmxlOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW3VzZXJzLCBzZXRVc2Vyc10gPSB1c2VTdGF0ZTxJVXNlcltdIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlcnJvciwgc2V0RXJyb3JdID0gdXNlU3RhdGU8RXJyb3IgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo4MDgwL3VzZXJzXCIsIHtcbiAgICAgIC8qaGVhZGVyczoge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsIC8vIFRPRE86IEFsbG93IGpzb24gY29udGVudCB0eXBlIGluIEF4dW0gQ29ycyBwb2xpY3lcbiAgICAgICAgfSwqL1xuICAgIH0pXG4gICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBva1wiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKChkYXRhKSA9PiBzZXRVc2VycyhkYXRhKSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNldEVycm9yKGVycm9yKSk7XG4gIH0sIFtdKTtcblxuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4gPGRpdj5FcnJvcjoge2Vycm9yLm1lc3NhZ2V9PC9kaXY+O1xuICB9XG5cbiAgaWYgKCF1c2Vycykge1xuICAgIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj47XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDE+VXNlcnM8L2gxPlxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2t5LTUwMFwiPlxuICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1za3ktNTAwXCI+XG4gICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2t5LTUwMFwiPlxuICAgICAgICAgICAgPHRoPlVzZXIgSUQ8L3RoPlxuICAgICAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICAgICAgPHRoPkJhbGFuY2U8L3RoPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGhlYWQ+XG4gICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLXNreS01MDBcIj5cbiAgICAgICAgICB7dXNlcnMubWFwKCh1c2VyKSA9PiAoXG4gICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1za3ktNTAwXCIga2V5PXt1c2VyLl9pZC4kb2lkfT5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxMaW5rIGhyZWY9e2AvdXNlcl9kZXRhaWxzLyR7dXNlci51c2VyX2lkfWB9PlxuICAgICAgICAgICAgICAgICAge3VzZXIudXNlcl9pZH1cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgIDwvdGQ+XG5cbiAgICAgICAgICAgICAgPHRkPnt1c2VyLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPnt1c2VyLmJhbGFuY2V9PC90ZD5cbiAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2xpZW50VXNlcnNUYWJsZTtcbiJdLCJuYW1lcyI6WyJMaW5rIiwiUmVhY3QiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkNsaWVudFVzZXJzVGFibGUiLCJ1c2VycyIsInNldFVzZXJzIiwiZXJyb3IiLCJzZXRFcnJvciIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJFcnJvciIsImpzb24iLCJkYXRhIiwiY2F0Y2giLCJkaXYiLCJtZXNzYWdlIiwiaDEiLCJ0YWJsZSIsImNsYXNzTmFtZSIsInRoZWFkIiwidHIiLCJ0aCIsInRib2R5IiwibWFwIiwidXNlciIsInRkIiwiaHJlZiIsInVzZXJfaWQiLCJuYW1lIiwiYmFsYW5jZSIsIl9pZCIsIiRvaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/app/UsersTable.tsx\n"));

/***/ })

});