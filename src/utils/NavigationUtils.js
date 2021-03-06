import { NavigationActions, StackActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}
function goBack() {
  _navigator.goBack();
}
function setParams(params) {
  _navigator.setParams(params);
}
function resetTo(routeName) {
  const action = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: routeName })]
  });
  _navigator.dispatch(action);
}

function replace(routeName, params = {}) {
  const action = StackActions.replace({
    routeName,
    params,
    key: _navigator.state.nav.routes[_navigator.state.nav.routes.length - 1].key
  });
  _navigator.dispatch(action);
}

export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  setParams,
  resetTo,
  replace
};
