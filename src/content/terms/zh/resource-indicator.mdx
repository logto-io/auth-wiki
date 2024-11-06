---
title: 资源指示器 (Resource indicator)
tags: [oauth 2.0]
description: OAuth 2.0 中的资源指示器 (Resource indicator) 是 RFC 8707 中定义的一个扩展参数，允许客户端在授权请求 (authorization request) 中指定资源服务器的位置。这提供了一种在单个授权服务器中处理多个资源服务器的可扩展方法。
---

## 什么是资源指示器 (Resource indicator)？

资源指示器 (Resource indicator) ，根据 OAuth 2.0 扩展 [RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707) 的定义，是一个参数，允许客户端在 <Ref slug="authorization-request" />（或在 <Ref slug="openid-connect" /> 中的 <Ref slug="authentication-request" />）和 <Ref slug="token-request" /> 中指定资源服务器的 URI。资源指示器用于指示客户端想要访问的资源服务器的位置。

> [!Note]
> 资源指示器是 OAuth 2.0 规范核心部分之外的一个扩展参数。请检查你的 <Ref slug="authorization-server" /> 文档以查看是否支持此参数。

## 资源指示器 (Resource indicator) 如何工作？

为了更好地理解资源指示器的工作原理，让我们考虑一个 <Ref slug="client" /> 想要使用单个授权服务器访问多个 <Ref slug="resource-server">资源服务器</Ref> 的场景。

### 1. 注册资源服务器

通常，开发者需要在授权服务器中注册每个资源服务器，以便客户端可以访问它们。具体的注册过程可能因授权服务器的实现而有所不同。功能名称可能会有所不同，比如“API 资源”或仅为“资源”。

假设客户端想要访问两个资源服务器：`https://api.example.com` 和 `https://api.another.com`，它们已经在授权服务器中注册。

### 2. 为每个资源服务器定义 scopes

与传统的 OAuth 2.0 流程不同，其中 <Ref slug="scope">scopes</Ref> 在所有资源服务器中共享，资源指示器扩展允许客户端为每个资源服务器指定 scopes。这也应该是注册过程的一部分。假设资源服务器具有以下 scopes：

| Resource Server           | Scopes           |
|---------------------------|------------------|
| `https://api.example.com` | `read`, `write`  |
| `https://api.another.com` | `read`, `delete` |

### 3. 在授权请求 (authorization request) 中包含资源指示器

要通知授权服务器我们要使用资源指示器扩展，客户端应该在授权请求 (authorization request) 中包含 `resource` 参数。

以下是包含资源指示器的授权请求 (authorization request) 的非规范示例：

```http
GET /authorize?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https%3A%2F%2Fclient.example.com%2Fcallback
  &scope=openid%20profile%20email%20read
  &state=abc123
  &nonce=123456
  &resource=https%3A%2F%2Fapi.example.com HTTP/1.1
```

在此示例中，客户端包含了 `resource` 参数，值为已编码的 `https%3A%2F%2Fapi.example.com`，以指示资源服务器的位置（`https://api.example.com`）。

你可能注意到，我们还包括了一些预定义的 scopes，如 `openid`，以及资源特定的 scopes。授权服务器应验证 scopes，并过滤掉与请求的资源服务器不相关的其他 scopes。这称为 **下调 (downscoping)**。

以下是客户端预期接收的四个实际 scopes 的表格：

| Resource Server           | Scopes                       |
|---------------------------|------------------------------|
| N/A                       | `openid`, `profile`, `email` |
| `https://api.example.com` | `read`                       |

资源指示器的优点在于，客户端可以通过重复 `resource` 参数在单个授权请求中请求多个资源服务器。让我们看看另一个例子：

```http
GET /authorize?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https%3A%2F%2Fclient.example.com%2Fcallback
  &scope=openid%20profile%20email%20read%20write%20delete
  &state=abc123
  &nonce=123456
  &resource=https%3A%2F%2Fapi.example.com
  &resource=https%3A%2F%2Fapi.another.com HTTP/1.1
```

在此示例中，客户端请求访问 `https://api.example.com` 和 `https://api.another.com`，以及各自的 scopes。授权服务器应验证每个资源服务器的 scopes，也就是说，进行 scopes 和资源服务器的 **笛卡尔积 (Cartesian product)**。结果应该是：

| Resource Server           | Scopes                       |
|---------------------------|------------------------------|
| N/A                       | `openid`, `profile`, `email` |
| `https://api.example.com` | `read`, `write`              |
| `https://api.another.com` | `read`, `delete`             |

对于此授权请求，共有七个有效的 scopes。

### 4. 在 token 请求中包含资源指示器

一旦客户端接收到授权码，它可以用一个 **单一** 的资源指示器（如果需要）将其交换为 access token。例如：

```http
POST /token HTTP/1.1
Host: your-authorization-server.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
  &code=AUTHORIZATION_CODE
  &redirect_uri=https%3A%2F%2Fclient.example.com%2Fcallback
  &client_id=YOUR_CLIENT_ID
  &client_secret=YOUR_CLIENT_SECRET
  &resource=https%3A%2F%2Fapi.example.com
```

在 token 请求中的 `resource` 参数是可选的。如果客户端包含此参数，授权服务器应根据当前授权关联的 scopes 验证资源指示器；否则，授权服务器应回到全局 scopes（例如，<Ref slug="openid-connect" /> scopes）。

> [!Note]
> 授权服务器应始终应用 <Ref slug="access-control" />，以确保签发的 access token 有效并根据当前授权上下文适当地进行了下调 (downscope)。

你可能想知道如何在授权中处理多个资源服务器。由于授权码只能使用一次，客户端可以使用其他授权，如 <Ref slug="refresh-token" /> 授权，来获取其他资源服务器的 access token。

## 为什么我们需要资源指示器 (Resource indicator)？

正如你从上面的例子中看到的，资源指示器扩展提供了一种可扩展的方法来处理多个资源服务器，而不会弄乱 <Ref slug="scope">scopes</Ref> 或担心 scope 冲突。这是一个强大的功能，为客户端访问不同资源服务器的资源提供了更多的灵活性。

值得注意的是，资源指示器扩展并不是 OAuth 2.0 规范的核心部分。请确保你的授权服务器支持此扩展，然后再在应用中使用它。

<SeeAlso slugs={['resource-server', 'scope', 'access-control', 'resource-owner']} />

<Resources
  urls={[
    'https://datatracker.ietf.org/doc/html/rfc8707',
    'https://docs.logto.io/docs/references/resources/',
  ]}
/>