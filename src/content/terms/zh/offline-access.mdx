---
title: 离线访问 (Offline access)
tags: [oauth 2.0, oidc]
description: 离线访问 (Offline access) 允许客户端在不要求用户重新进行认证 (authenticate) 的情况下获取新的访问令牌 (access token)。对于长时间会话和更好的用户体验，它是非常有用的。
---

## 什么是离线访问 (Offline access)？

离线访问 (Offline access) 的概念可能因上下文而异，我们将重点关注 OAuth 2.0 和 OpenID Connect (OIDC) 规范。在此上下文中，离线访问 (Offline access) 允许客户端使用<Ref slug="refresh-token">刷新令牌 (refresh token)</Ref>获取新的<Ref slug="access-token">访问令牌 (access tokens)</Ref>，而不需要用户重新进行认证 (authenticate)。此功能对于长时间会话和更好的用户体验尤其有用。

值得注意的是，OAuth 2.0 没有明确定义“离线访问 (offline access)”一词；它只指定使用刷新令牌 (refresh token) 来获取新的访问令牌 (access tokens)。然而，“离线访问 (offline access)”这一术语（以及 `offline_access` scope）已在业界被广泛采用来指代这一能力，并在<Ref slug="openid-connect" />规范中被正式定义。

## 离线访问 (Offline access) 如何工作？

为简单起见，我们将使用 OAuth 2.0 术语 <Ref slug="authorization-request" /> 和 <Ref slug="authorization-server" /> 来说明离线访问 (offline access) 如何工作。它们在 OIDC 中的替代术语分别是 <Ref slug="authentication-request" /> 和 <Ref slug="openid-connect" headingId="openid-provider-op" />。

利用离线访问 (offline access) 涉及两个主要步骤：

1. **请求离线访问 (offline access)**：当<Ref slug="client" />向授权服务器 (authorization server) 发起授权请求 (authorization request) 时，它包含 `offline_access` scope 以请求离线访问 (offline access)。此 scope 表示客户端希望获得一个刷新令牌 (refresh token) 以及访问令牌 (access token)。

   离线访问 (offline access) 的支持可能因授权服务器 (authorization server) 而异，且授权服务器可能会忽略 `offline_access` scope 如果它不支持该功能。在使用此 scope 之前，请参阅授权服务器的文档以确保兼容性。

2. **使用刷新令牌 (refresh token)**：一旦<Ref slug="oauth-2.0-grant" />完成，客户端应收到一个<Ref slug="refresh-token">刷新令牌 (refresh token)</Ref>以及<Ref slug="access-token">访问令牌 (access token)</Ref>。客户端可以安全地存储刷新令牌，并在当前访问令牌过期时使用它向授权服务器发送<Ref slug="token-request">令牌请求 (token request)</Ref>以获取新的访问令牌 (access token)。

有关离线访问 (offline access) 实际操作的详细示例，请参阅<Ref slug="refresh-token" />文章。

## 安全考虑

离线访问 (offline access) 的安全影响类似于刷新令牌 (refresh token)。有关详细信息，请参阅刷新令牌 (refresh token) 的<Ref slug="refresh-token" headingId="security-considerations" />部分。

<SeeAlso slugs={['refresh-token', 'oauth-2.0', 'openid-connect']} />

<Resources
  urls={[
    "https://blog.logto.io/understanding-refresh-token-rotation",
    "https://blog.logto.io/understanding-tokens-in-oidc",
    {
      url: "https://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess",
      result: {
        ogTitle: "OpenID Connect Core 1.0 中的离线访问 (Offline Access)",
      }
    },
    {
      url: "https://datatracker.ietf.org/doc/html/rfc6749#section-1.5",
      result: {
        ogTitle: "OAuth 2.0 中的刷新令牌 (Refresh Token)",
        ogDescription: "刷新令牌 (Refresh tokens) 是用于获取访问令牌 (access tokens) 的凭证。",
      },
    },
  ]}
/>