export const STARK_ABI = [
  {
    type: 'struct',
    name: 'core::integer::u256',
    members: [
      {
        name: 'low',
        type: 'core::integer::u128'
      },
      {
        name: 'high',
        type: 'core::integer::u128'
      }
    ]
  },
  {
    type: 'struct',
    name: 'core::array::Span::<core::integer::u256>',
    members: [
      {
        name: 'snapshot',
        type: '@core::array::Array::<core::integer::u256>'
      }
    ]
  },
  {
    type: 'function',
    name: 'setFee',
    inputs: [
      {
        name: 'values',
        type: 'core::array::Span::<core::integer::u256>'
      },
      {
        name: 'fees',
        type: 'core::array::Span::<core::integer::u256>'
      },
      {
        name: 'max_fee',
        type: 'core::integer::u256'
      }
    ],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'setMaxFee',
    inputs: [
      {
        name: 'max_fee',
        type: 'core::integer::u256'
      }
    ],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'setFeeCollector',
    inputs: [
      {
        name: 'fee_collector',
        type: 'core::starknet::contract_address::ContractAddress'
      }
    ],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'setReferralEarningBips',
    inputs: [
      {
        name: 'earning_bips',
        type: 'core::integer::u16'
      }
    ],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'setEarningBipsForReferrer',
    inputs: [
      {
        name: 'referrer',
        type: 'core::starknet::contract_address::ContractAddress'
      },
      {
        name: 'earning_bips',
        type: 'core::integer::u16'
      }
    ],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'getPoolId',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getFee',
    inputs: [
      {
        name: 'value',
        type: 'core::integer::u256'
      }
    ],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getValues',
    inputs: [],
    outputs: [
      {
        type: 'core::array::Span::<core::integer::u256>'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getMaxFee',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getFeeCollector',
    inputs: [],
    outputs: [
      {
        type: 'core::starknet::contract_address::ContractAddress'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getBalance',
    inputs: [
      {
        name: 'address',
        type: 'core::starknet::contract_address::ContractAddress'
      }
    ],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'struct',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::AddressStatistics',
    members: [
      {
        name: 'deposits_count',
        type: 'core::integer::u256'
      },
      {
        name: 'deposits_volume',
        type: 'core::integer::u256'
      }
    ]
  },
  {
    type: 'function',
    name: 'getAddressStatistics',
    inputs: [
      {
        name: 'address',
        type: 'core::starknet::contract_address::ContractAddress'
      }
    ],
    outputs: [
      {
        type: 'rocketsam_starknet::rocketsam::pool::Pool::AddressStatistics'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getDepositsCount',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getDepositsVolume',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getFeeEarnedAmount',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'getFeeClaimedAmount',
    inputs: [],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'estimateProtocolFee',
    inputs: [
      {
        name: 'amount',
        type: 'core::integer::u256'
      }
    ],
    outputs: [
      {
        type: 'core::integer::u256'
      }
    ],
    state_mutability: 'view'
  },
  {
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        name: 'amount',
        type: 'core::integer::u256'
      }
    ],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'depositWithReferrer',
    inputs: [
      {
        name: 'referrer',
        type: 'core::starknet::contract_address::ContractAddress'
      },
      {
        name: 'amount',
        type: 'core::integer::u256'
      }
    ],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'withdraw',
    inputs: [],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'claimFeeEarnings',
    inputs: [],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'claimReferralEarnings',
    inputs: [],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'impl',
    name: 'PausableImpl',
    interface_name: 'openzeppelin::security::pausable::IPausable'
  },
  {
    type: 'enum',
    name: 'core::bool',
    variants: [
      {
        name: 'False',
        type: '()'
      },
      {
        name: 'True',
        type: '()'
      }
    ]
  },
  {
    type: 'interface',
    name: 'openzeppelin::security::pausable::IPausable',
    items: [
      {
        type: 'function',
        name: 'is_paused',
        inputs: [],
        outputs: [
          {
            type: 'core::bool'
          }
        ],
        state_mutability: 'view'
      }
    ]
  },
  {
    type: 'function',
    name: 'pause',
    inputs: [],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'function',
    name: 'unpause',
    inputs: [],
    outputs: [],
    state_mutability: 'external'
  },
  {
    type: 'impl',
    name: 'OwnableImpl',
    interface_name: 'openzeppelin::access::ownable::interface::IOwnable'
  },
  {
    type: 'interface',
    name: 'openzeppelin::access::ownable::interface::IOwnable',
    items: [
      {
        type: 'function',
        name: 'owner',
        inputs: [],
        outputs: [
          {
            type: 'core::starknet::contract_address::ContractAddress'
          }
        ],
        state_mutability: 'view'
      },
      {
        type: 'function',
        name: 'transfer_ownership',
        inputs: [
          {
            name: 'new_owner',
            type: 'core::starknet::contract_address::ContractAddress'
          }
        ],
        outputs: [],
        state_mutability: 'external'
      },
      {
        type: 'function',
        name: 'renounce_ownership',
        inputs: [],
        outputs: [],
        state_mutability: 'external'
      }
    ]
  },
  {
    type: 'impl',
    name: 'OwnableCamelOnlyImpl',
    interface_name: 'openzeppelin::access::ownable::interface::IOwnableCamelOnly'
  },
  {
    type: 'interface',
    name: 'openzeppelin::access::ownable::interface::IOwnableCamelOnly',
    items: [
      {
        type: 'function',
        name: 'transferOwnership',
        inputs: [
          {
            name: 'newOwner',
            type: 'core::starknet::contract_address::ContractAddress'
          }
        ],
        outputs: [],
        state_mutability: 'external'
      },
      {
        type: 'function',
        name: 'renounceOwnership',
        inputs: [],
        outputs: [],
        state_mutability: 'external'
      }
    ]
  },
  {
    type: 'constructor',
    name: 'constructor',
    inputs: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress'
      },
      {
        name: 'pool_id',
        type: 'core::integer::u256'
      },
      {
        name: 'fee',
        type: 'core::integer::u256'
      },
      {
        name: 'fee_collector',
        type: 'core::starknet::contract_address::ContractAddress'
      },
      {
        name: 'referral_earning_bips',
        type: 'core::integer::u16'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::FeeChanged',
    kind: 'struct',
    members: [
      {
        name: 'values',
        type: 'core::array::Span::<core::integer::u256>',
        kind: 'data'
      },
      {
        name: 'fees',
        type: 'core::array::Span::<core::integer::u256>',
        kind: 'data'
      },
      {
        name: 'max_fee',
        type: 'core::integer::u256',
        kind: 'data'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::MaxFeeChanged',
    kind: 'struct',
    members: [
      {
        name: 'old_max_fee',
        type: 'core::integer::u256',
        kind: 'key'
      },
      {
        name: 'new_max_fee',
        type: 'core::integer::u256',
        kind: 'key'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::FeeCollectorChanged',
    kind: 'struct',
    members: [
      {
        name: 'old_fee_collector',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      },
      {
        name: 'new_fee_collector',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::CommonRefBipsChanged',
    kind: 'struct',
    members: [
      {
        name: 'old_bips',
        type: 'core::integer::u16',
        kind: 'key'
      },
      {
        name: 'new_bips',
        type: 'core::integer::u16',
        kind: 'key'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::ReferrerBipsChanged',
    kind: 'struct',
    members: [
      {
        name: 'referrer',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      },
      {
        name: 'old_bips',
        type: 'core::integer::u16',
        kind: 'data'
      },
      {
        name: 'new_bips',
        type: 'core::integer::u16',
        kind: 'data'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::Deposit',
    kind: 'struct',
    members: [
      {
        name: 'depositer',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      },
      {
        name: 'fee_earned',
        type: 'core::integer::u256',
        kind: 'data'
      },
      {
        name: 'amount',
        type: 'core::integer::u256',
        kind: 'data'
      },
      {
        name: 'balance',
        type: 'core::integer::u256',
        kind: 'data'
      },
      {
        name: 'referrer',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      },
      {
        name: 'referrer_share',
        type: 'core::integer::u256',
        kind: 'data'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::Withdraw',
    kind: 'struct',
    members: [
      {
        name: 'depositer',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      },
      {
        name: 'amount',
        type: 'core::integer::u256',
        kind: 'data'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::FeeClaimed',
    kind: 'struct',
    members: [
      {
        name: 'collector',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      },
      {
        name: 'amount',
        type: 'core::integer::u256',
        kind: 'data'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::ReferralClaimed',
    kind: 'struct',
    members: [
      {
        name: 'referrer',
        type: 'core::starknet::contract_address::ContractAddress',
        kind: 'key'
      },
      {
        name: 'amount',
        type: 'core::integer::u256',
        kind: 'data'
      }
    ]
  },
  {
    type: 'event',
    name: 'rocketsam_starknet::rocketsam::pool::Pool::Event',
    kind: 'enum',
    variants: [
      {
        name: 'FeeChanged',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::FeeChanged',
        kind: 'nested'
      },
      {
        name: 'MaxFeeChanged',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::MaxFeeChanged',
        kind: 'nested'
      },
      {
        name: 'FeeCollectorChanged',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::FeeCollectorChanged',
        kind: 'nested'
      },
      {
        name: 'CommonRefBipsChanged',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::CommonRefBipsChanged',
        kind: 'nested'
      },
      {
        name: 'ReferrerBipsChanged',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::ReferrerBipsChanged',
        kind: 'nested'
      },
      {
        name: 'Deposit',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::Deposit',
        kind: 'nested'
      },
      {
        name: 'Withdraw',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::Withdraw',
        kind: 'nested'
      },
      {
        name: 'FeeClaimed',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::FeeClaimed',
        kind: 'nested'
      },
      {
        name: 'ReferralClaimed',
        type: 'rocketsam_starknet::rocketsam::pool::Pool::ReferralClaimed',
        kind: 'nested'
      }
    ]
  }
]
