import { mount } from "@vue/test-utils";
import Header from "@/components/header.vue";

describe("Header", () => {
  it("タイトル名があって、変更されていないか", () => {
    const wrapper = mount(Header);
    // クラス名を取得
    const title = wrapper.find(".logo");
    expect(title.text()).toBe("NOSNOL");
  });
});
