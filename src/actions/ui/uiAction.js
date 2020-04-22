export function affixData(data) {
  return {type: "affixData", affixdata: data};
}

export function sideNavConfig(data) {
  return {type: "sideNavConfig", sideNavConfig: data};
}

export function sideNavPin(data) {
  return {type: "sideNavPin", sideNavPin: data};
}

export function setSideClose() {
  return {type: "setSideClose", setSideClose: "close"};
}