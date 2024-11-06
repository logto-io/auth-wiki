---
title: JSON Web 加密 (JSON Web Encryption, JWE)
tags: [oidc, jose]
description: JSON Web 加密 (JWE) 是一种以 JSON 格式加密和解密数据的标准方式。它通常用于保护传输 JSON Web 令牌 (JWTs) 中的敏感信息。
---

## 什么是 JSON Web 加密 (JWE)？

如 RFC 7516 中定义，JSON Web 加密 (JWE) 是一种以 JSON 格式加密和解密数据的机制。它为数据添加了一层保密性，在通过不受信任的网络传输敏感信息时特别有用。

JWE 通常与 <Ref slug="jwt">JSON Web 令牌 (JWTs)</Ref> 结合使用以保护有效载荷数据。例如，一个 <Ref slug="id-token" /> 或 <Ref slug="access-token" /> 可以使用 JWE 加密，以确保数据在传输过程中的安全。

## JWE 如何工作？

JWE 有两种序列化格式：紧凑和 JSON。每种格式都有其表示加密数据的方式。

### 紧凑序列化

在紧凑序列化中，JWE 被表示为一个包含五个 Base64URL 编码部分的字符串，这些部分之间用点（`.`）分隔。这五个部分是：

```
{{header}}.{{encrypted-key}}.{{iv}}.{{ciphertext}}.{{tag}}
```

每个部分的用途如下：

- `header`：包含有关加密算法和密钥管理的元数据。
- `encrypted-key`：用于加密有效载荷的加密内容加密密钥 (CEK)。
- `iv`：加密过程中使用的初始化向量。
- `ciphertext`：加密的有效载荷数据。
- `tag`：用于验证加密数据完整性的认证标签。

### JSON 序列化

JSON 序列化更为详细，并提供了一种结构化的方式来表示 JWE。JWE 表示为一个包含以下属性的 JSON 对象：

```json
{
  "protected": "{{protected-header}}",
  "unprotected": "{{unprotected-header}}",
  "header": "{{header}}",
  "encrypted_key": "{{encrypted-key}}",
  "iv": "{{iv}}",
  "ciphertext": "{{ciphertext}}",
  "tag": "{{tag}}",
  "aad": "{{additional-authenticated-data}}"
}
```

- `protected`：包含 Base64URL 编码的受保护头。
- `unprotected`：包含 JWE 共享未受保护头。
- `header`：包含 JWE 每个接收者的未受保护头。
- `encrypted_key`：包含 Base64URL 编码的加密内容加密密钥 (CEK)。
- `iv`：包含 Base64URL 编码的初始化向量。
- `ciphertext`：包含 Base64URL 编码的密文（加密的有效载荷）。
- `tag`：包含 Base64URL 编码的认证标签。
- `aad`：包含 Base64URL 编码的附加认证数据。

---

客户端应该能够使用适当的密钥和算法解密 JWE。可以使用预先通信的密钥或从密钥协商协议派生的密钥解密 JWE。

例如，一个 <Ref slug="id-token" /> 可以使用 JWE 加密，客户端可以使用从 OpenID 提供者的 `jwks_uri` 端点获得的适当密钥解密它。

<SeeAlso slugs={["jwt", "jwk", "openid-connect-discovery"]} />

<Resources
  urls={[
    "https://datatracker.ietf.org/doc/html/rfc7516",
    "https://datatracker.ietf.org/doc/html/rfc7517",
    "https://datatracker.ietf.org/doc/html/rfc7518",
  ]}
/>
