/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
import * as $protobuf from "protobufjs/light";

const $root = ($protobuf.roots["default"] || ($protobuf.roots["default"] = new $protobuf.Root()))
.setOptions({
  swift_prefix: ""
})
.addJSON({
  Account: {
    options: {
      swift_prefix: ""
    },
    nested: {
      Directory: {
        fields: {
          code: {
            type: "string",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          }
        }
      },
      Verification: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          imageUrl: {
            type: "string",
            id: 2
          },
          type: {
            type: "string",
            id: 3
          },
          status: {
            type: "string",
            id: 4
          },
          message: {
            type: "string",
            id: 5
          },
          verifyAt: {
            type: "string",
            id: 6
          },
          createdAt: {
            type: "string",
            id: 7
          }
        }
      },
      User: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          avatar: {
            type: "string",
            id: 3
          },
          country: {
            type: "Directory",
            id: 5
          }
        }
      },
      Profile: {
        fields: {
          user: {
            type: "User",
            id: 1
          },
          email: {
            type: "string",
            id: 4
          },
          language: {
            type: "Directory",
            id: 2
          },
          verifications: {
            rule: "repeated",
            type: "Verification",
            id: 6
          }
        }
      },
      UpdateAvatarResponse: {
        fields: {
          url: {
            type: "string",
            id: 10
          }
        }
      },
      ProfileResponse: {
        fields: {
          profile: {
            type: "Profile",
            id: 1
          }
        }
      },
      UploadVerificationResponse: {
        fields: {
          verification: {
            type: "Verification",
            id: 1
          }
        }
      },
      UpdateProfileRequest: {
        fields: {
          username: {
            type: "string",
            id: 10
          },
          email: {
            type: "string",
            id: 20
          },
          language: {
            type: "Directory",
            id: 30
          },
          country: {
            type: "Directory",
            id: 40
          }
        }
      }
    }
  },
  Auth: {
    options: {
      swift_prefix: ""
    },
    nested: {
      ValidationRQ: {
        fields: {
          uid: {
            type: "string",
            id: 10
          },
          username: {
            type: "string",
            id: 20
          },
          email: {
            type: "string",
            id: 30
          }
        }
      },
      RegistrationRQ: {
        fields: {
          uid: {
            type: "string",
            id: 10
          },
          username: {
            type: "string",
            id: 20
          },
          password: {
            type: "string",
            id: 30
          },
          openKey: {
            type: "string",
            id: 40
          },
          email: {
            type: "string",
            id: 50
          },
          country: {
            type: "string",
            id: 60
          },
          language: {
            type: "string",
            id: 70
          }
        }
      },
      LoginRQ: {
        fields: {
          username: {
            type: "string",
            id: 10
          },
          password: {
            type: "string",
            id: 20
          }
        }
      },
      LoginSuccessRS: {
        fields: {
          profile: {
            type: "Account.Profile",
            id: 2
          },
          token: {
            type: "string",
            id: 3
          }
        }
      }
    }
  },
  Chat: {
    options: {
      swift_prefix: ""
    },
    nested: {
      ConversationParticipant: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          avatarURL: {
            type: "string",
            id: 3
          }
        }
      },
      ConversationMessage: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          message: {
            type: "string",
            id: 2
          },
          createdAt: {
            type: "string",
            id: 3
          },
          isRead: {
            type: "bool",
            id: 4
          },
          senderPid: {
            type: "string",
            id: 5
          },
          conversationPid: {
            type: "string",
            id: 6
          }
        }
      },
      Conversation: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          lastMessage: {
            type: "ConversationMessage",
            id: 2
          },
          participants: {
            rule: "repeated",
            type: "ConversationParticipant",
            id: 3
          },
          unreadMessages: {
            type: "int32",
            id: 4
          }
        }
      },
      ConversationIndicator: {
        fields: {
          conversationPid: {
            type: "string",
            id: 1
          },
          count: {
            type: "int32",
            id: 2
          }
        }
      },
      IndicatorMessage: {
        fields: {
          count: {
            type: "int32",
            id: 1
          },
          conversations: {
            rule: "repeated",
            type: "ConversationIndicator",
            id: 2
          }
        }
      },
      ConversationMarkMessage: {
        fields: {
          conversationPid: {
            type: "string",
            id: 1
          },
          messagesPids: {
            rule: "repeated",
            type: "string",
            id: 2
          }
        }
      },
      MarkMessages: {
        fields: {
          markers: {
            rule: "repeated",
            type: "ConversationMarkMessage",
            id: 1
          }
        }
      },
      SendMessageRequest: {
        fields: {
          localPid: {
            type: "string",
            id: 1
          },
          userPid: {
            type: "string",
            id: 2
          },
          conversationPid: {
            type: "string",
            id: 3
          },
          message: {
            type: "string",
            id: 4
          }
        }
      },
      SendMessageCallback: {
        fields: {
          localPid: {
            type: "string",
            id: 1
          },
          messagePid: {
            type: "string",
            id: 2
          },
          conversationPid: {
            type: "string",
            id: 3
          }
        }
      },
      ConversationListRequest: {
        fields: {
          fromDate: {
            type: "string",
            id: 1
          },
          conversationPid: {
            rule: "repeated",
            type: "string",
            id: 2
          }
        }
      },
      ConversationListResponse: {
        fields: {
          conversations: {
            rule: "repeated",
            type: "Conversation",
            id: 1
          }
        }
      },
      ConversationHistoryRequest: {
        fields: {
          fromDate: {
            type: "string",
            id: 1
          },
          userPid: {
            type: "string",
            id: 2
          },
          conversationPid: {
            type: "string",
            id: 3
          }
        }
      },
      ConversationHistoryCallback: {
        fields: {
          conversationPid: {
            type: "string",
            id: 1
          },
          userPid: {
            type: "string",
            id: 2
          },
          messages: {
            rule: "repeated",
            type: "ConversationMessage",
            id: 3
          },
          participants: {
            rule: "repeated",
            type: "ConversationParticipant",
            id: 4
          },
          lastMessage: {
            type: "ConversationMessage",
            id: 5
          }
        }
      }
    }
  },
  Contacts: {
    nested: {
      Contact: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          username: {
            type: "string",
            id: 2
          },
          avatarURL: {
            type: "string",
            id: 3
          }
        }
      },
      ContactsListResponse: {
        fields: {
          contacts: {
            rule: "repeated",
            type: "Contact",
            id: 1
          }
        }
      }
    }
  },
  News: {
    options: {
      swift_prefix: ""
    },
    nested: {
      ShortNews: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          imageUrl: {
            type: "string",
            id: 3
          },
          publishedAt: {
            type: "string",
            id: 4
          }
        }
      },
      DetailedNews: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          imageUrl: {
            type: "string",
            id: 3
          },
          publishedAt: {
            type: "string",
            id: 4
          },
          content: {
            type: "string",
            id: 5
          }
        }
      },
      NewsListResponse: {
        fields: {
          news: {
            rule: "repeated",
            type: "ShortNews",
            id: 1
          },
          pagination: {
            type: "Protocol.Pagination",
            id: 2
          }
        }
      },
      NewsDetailsResponse: {
        fields: {
          news: {
            type: "DetailedNews",
            id: 1
          }
        }
      }
    }
  },
  Protocol: {
    options: {
      swift_prefix: ""
    },
    nested: {
      MapError: {
        fields: {
          path: {
            type: "string",
            id: 1
          },
          messages: {
            rule: "repeated",
            type: "string",
            id: 2
          }
        }
      },
      ErrorValidation: {
        fields: {
          errors: {
            rule: "repeated",
            type: "MapError",
            id: 1
          }
        }
      },
      EmptyResponse: {
        fields: {}
      },
      Pagination: {
        fields: {
          allowObjects: {
            type: "int32",
            id: 1
          },
          allowPages: {
            type: "int32",
            id: 2
          },
          currentPage: {
            type: "int32",
            id: 3
          },
          allowNext: {
            type: "bool",
            id: 4
          },
          allowPrev: {
            type: "bool",
            id: 5
          }
        }
      }
    }
  },
  Tickets: {
    nested: {
      TicketStatus: {
        values: {
          NEW: 0,
          CLOSED: 1
        }
      },
      AttachmentRequest: {
        fields: {
          comment: {
            type: "string",
            id: 1
          },
          content: {
            type: "bytes",
            id: 2
          }
        }
      },
      AttachmentResponse: {
        fields: {
          comment: {
            type: "string",
            id: 1
          },
          imageUrl: {
            type: "string",
            id: 2
          }
        }
      },
      ModeratorStruct: {
        fields: {
          username: {
            type: "string",
            id: 1
          }
        }
      },
      Ticket: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          title: {
            type: "string",
            id: 2
          },
          status: {
            type: "TicketStatus",
            id: 4
          },
          createdAt: {
            type: "string",
            id: 5
          },
          messages: {
            rule: "repeated",
            type: "TicketMessage",
            id: 6
          }
        }
      },
      TicketMessage: {
        fields: {
          pid: {
            type: "string",
            id: 1
          },
          message: {
            type: "string",
            id: 2
          },
          createdAt: {
            type: "string",
            id: 3
          },
          attachments: {
            rule: "repeated",
            type: "AttachmentResponse",
            id: 4
          },
          moderator: {
            type: "ModeratorStruct",
            id: 5
          }
        }
      },
      TicketsResponse: {
        fields: {
          tickets: {
            rule: "repeated",
            type: "Ticket",
            id: 1
          },
          pagination: {
            type: "Protocol.Pagination",
            id: 2
          }
        }
      },
      CreateTicketRequest: {
        fields: {
          title: {
            type: "string",
            id: 1
          },
          message: {
            type: "string",
            id: 2
          },
          attachments: {
            rule: "repeated",
            type: "AttachmentRequest",
            id: 3
          }
        }
      },
      CreateTicketResponse: {
        fields: {
          ticket: {
            type: "Ticket",
            id: 1
          }
        }
      },
      CreateTicketMessageRequest: {
        fields: {
          ticketPid: {
            type: "string",
            id: 1
          },
          localPid: {
            type: "string",
            id: 2
          },
          message: {
            type: "string",
            id: 3
          },
          attachments: {
            rule: "repeated",
            type: "AttachmentRequest",
            id: 4
          }
        }
      },
      CreateTicketMessageResponse: {
        fields: {
          localPid: {
            type: "string",
            id: 1
          },
          message: {
            type: "TicketMessage",
            id: 2
          }
        }
      },
      TicketDetailsResponse: {
        fields: {
          ticket: {
            type: "Ticket",
            id: 1
          },
          pagination: {
            type: "Protocol.Pagination",
            id: 2
          }
        }
      }
    }
  },
  Wallets: {
    nested: {
      CreateWalletRequest: {
        fields: {
          name: {
            type: "string",
            id: 1
          },
          openKey: {
            type: "string",
            id: 2
          }
        }
      }
    }
  }
});

export { $root as default };
