export const manifest = {
  screens: {
    scr_b8b4xq: { name: "Home", route: "/#home", position: { "x": 160, "y": 220 } },
    scr_n94ez3: { name: "Services", route: "/#services", position: { "x": 1560, "y": 220 } },
    scr_i977p0: { name: "Projects", route: "/#projects", position: { "x": 2960, "y": 220 } },
    scr_95rt6c: { name: "About", route: "/#about", position: { "x": 4360, "y": 220 } },
    scr_o76zn9: { name: "Contact", route: "/#contact", position: { "x": 5760, "y": 220 } }
  },
  sections: {
    sec_pjwm11: { name: "Main Navigation", x: 0, y: 0, width: 7120, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_pjwm11", children: [
    { kind: "screen", id: "scr_b8b4xq" },
    { kind: "screen", id: "scr_n94ez3" },
    { kind: "screen", id: "scr_i977p0" },
    { kind: "screen", id: "scr_95rt6c" },
    { kind: "screen", id: "scr_o76zn9" }]
  }]

};