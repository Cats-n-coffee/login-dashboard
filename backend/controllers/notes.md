# Notes

## docs

1. Set-Cookie header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
2. withCredential: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials
3. Express set cookie and header
   - Set the _Set-Cookie_ headers
   - Set the cookies at the browser

```js
res.cookie(name, value, [otpions]); // http://expressjs.com/en/api.html
```

4. **important**

Understand the _SameSite=None; Secure=true;_
