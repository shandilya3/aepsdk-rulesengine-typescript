import RulesEngine from "../src/index";

const RULE_SET = {
  version: 1.1,
  rules: [
    {
      condition: {
        type: "matcher",
        definition: {
          key: "membershipPoint",
          matcher: "ge",
          values: [6000, 3000],
        },
      },
      consequences: [
        {
          id: "b2023",
          type: "data",
          detail: {
            html: "<h1> You can increase your membership point by using our promo benefits, sign up now!</h1>",
          },
        },
      ],
    },
  ],
};

describe("matcher type - greater than equals  (ge)", () => {
  let ruleset;

  beforeEach(() => {
    ruleset = RulesEngine(RULE_SET);
  });

  it("returns consequence  when the context key's values is greater than or equal to rule's condition definition values", () => {
    const result = ruleset.execute({
      country: "USA",
      city: "Salt Lake City",
      state: "UT",
      membershipPoint: 6000,
    });

    expect(result).toEqual([RULE_SET.rules[0].consequences]);
  });

  it("returns consequence  when the context key's values is  greater than or equal to rule's condition definition values", () => {
    const result = ruleset.execute({
      country: "USA",
      city: "Salt Lake City",
      state: "UT",
      membershipPoint: 3000,
    });

    expect(result).toEqual([RULE_SET.rules[0].consequences]);
  });

  it("returns empty consequence when the context key's values is  null", () => {
    const result = ruleset.execute({
      country: "USA",
      city: "Salt Lake City",
      state: "UT",
      membershipPoint: null,
    });

    expect(result).toEqual([]);
  });

  it("returns  empty consequence when the  context key's values is undefined", () => {
    const result = ruleset.execute({
      country: "USA",
      city: "Salt Lake City",
      state: "UT",
      membershipPoint: undefined,
    });

    expect(result).toEqual([]);
  });
});
