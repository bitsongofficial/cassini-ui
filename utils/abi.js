export const balanceOf = [
  {
    name: "balanceOf",
    type: "function",
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    constant: true,
    payable: false
  }
];

export const allowance = [
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      },
      {
        name: "_spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
