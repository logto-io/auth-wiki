---
title: OpenID Connect (OIDC) 发现 (Discovery)
tags: [oidc]
description: OpenID Connect (OIDC) 发现是一种机制，允许客户端自动发现 OpenID Provider 的端点和配置。
---

## 什么是 OpenID Connect (OIDC) 发现？

OpenID Connect (OIDC) 发现，定义在 [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html) 中，是一种允许<Ref slug="client">客户端</Ref>自动发现 OpenID Provider 的端点和配置的机制。这是一种现代方法，用于简化客户端与<Ref slug="openid-connect" headingId="openid-provider-op">OpenID Provider</Ref>之间的通信。

OIDC 发现有两个主要组件：

- OpenID Provider 发行者发现：客户端可以通过 [WebFinger](https://tools.ietf.org/html/rfc7033) 或带外文档发现发行者的位置 (URL)。
- OpenID Provider 元数据：客户端可以检索并处理元数据文档，以了解 OpenID Provider 的功能和端点。

## OIDC 发现是如何工作的？

### OpenID Provider 发行者发现

OpenID Provider 发行者是一个唯一标识符（通常与其 URL 相同），客户端可以使用它来发现 OpenID Provider 的配置。然而，客户端需要先知道发行者的位置，才能获取元数据文档。

如果发行者位置已知，客户端可以跳到下一步。否则，客户端可以使用 WebFinger 来发现发行者的位置。OIDC 发行者发现所需的信息包括：

- `host`: WebFinger 服务的主机地址。
- `resource`: OpenID Provider 的电子邮件地址或 URL。
- `rel`: 关系类型，应设置为 `http://openid.net/specs/connect/1.0/issuer`。

例如，一个邮件地址为 `foo@bar.com` 的用户尝试在 `example.com` 上发现发行者的位置。WebFinger 请求将如下所示：

```http
GET /.well-known/webfinger?resource=acct%3Afoo%40bar.com&
  rel=http%3A%2F%2Fopenid.net%2Fspecs%2Fconnect%2F1.0%2Fissuer HTTP/1.1
Host: example.com
```

解码后的 `resource` 参数是 `acct:foo@bar.com`，`rel` 参数是 `http://openid.net/specs/connect/1.0/issuer`。

### OpenID Provider 元数据

一旦客户端知道发行者的位置，它可以从知名端点检索元数据文档。元数据文档的路径是相对于发行者 URL 的 `/.well-known/openid-configuration`。

例如，如果发行者的 URL 是 `https://oidc.example.com`，那么客户端可以从 `https://oidc.example.com/.well-known/openid-configuration` 检索元数据文档。以下是元数据响应的一个非规范性示例：

```json
{
  "issuer": "https://oidc.example.com",
  "authorization_endpoint": "https://oidc.example.com/authorize",
  "token_endpoint": "https://oidc.example.com/token",
  //...
}
```

元数据文档包含许多关于 OpenID Provider 的有用信息。让我们重点介绍几个关键字段：

- `issuer`: OpenID Provider 的唯一标识符。应该用于验证令牌。
- `authorization_endpoint`: 启动<Ref slug="authentication-request" />的 URL。
- `token_endpoint`: 发送<Ref slug="token-request" />的 URL。
- `jwks_uri`: 检索<Ref slug="signing-key" />验证所需<Ref slug="jwk" headingId="json-web-key-set-jwks" />的 URL。
- `response_types_supported`: 支持的<Ref slug="authentication-request" />响应类型。
- `scopes_supported`: 支持的<Ref slug="authentication-request" /><Ref slug="scope">范围</Ref>。
- `claims_supported`: 支持的<Ref slug="id-token" /><Ref slug="claim">声明</Ref>。
- `token_endpoint_auth_methods_supported`: 支持的<Ref slug="token-request" />客户端认证方法。

欲了解元数据字段的详尽列表，请参考 [OpenID Connect Discovery 1.0](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata) 规范。

<SeeAlso slugs={["openid-connect", "authentication-request", "jwt", "token-request"]} />

<Resources
  urls={[
    'https://blog.logto.io/exploring-oidc-configuration',
    'https://openid.net/specs/openid-connect-discovery-1_0.html',
  ]}
/>
