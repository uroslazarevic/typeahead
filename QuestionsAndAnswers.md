# Written Questions And Answers

1. If you had control of the web-server, what are some ways you might implement a caching solution?

- In-Memory Cache with Redis: One effective caching solution in Node.js involves using Redis as an in-memory data store. You can store frequently accessed data in Redis, such as database query results or API responses, and set expiration times to ensure freshness. Redis's speed and key-value store nature make it ideal for caching purposes, and the node-redis library simplifies integration with your Node.js server.

- HTTP Caching: Leveraging HTTP caching mechanisms is another approach. Configure your Node.js server to set appropriate caching headers like Cache-Control and ETag when serving responses. This allows clients and intermediaries (e.g., CDNs) to cache responses and reduce the need for server-side processing, improving overall performance.

2. How might you implement offline caching for your typeahead component?

- To implement offline caching for the Typeahead Component, you can utilize a combination of Service Workers and the Cache API. Service Workers allow you to intercept and cache network requests, while the Cache API enables you to store responses locally. When a user accesses the component, the Service Worker can check if the necessary data is available in the cache, and if so, serve it directly from the cache, enabling the component to work offline seamlessly.

3. When using traditional session cookies, what are the primary security concerns and
   mitigation techniques you might use?

- The primary security concerns with traditional session cookies include session hijacking and session fixation. To mitigate these risks, it msut be ensured that session cookies are transmitted over secure connections (HTTPS) to prevent unauthorized interception and implement practices like using secure, HTTP-only cookies, and frequently rotating session IDs to minimize the window of opportunity for attackers to exploit stolen or fixed session identifiers.

4. What are some advantages and disadvantages to using JWT for authorization and
   authentication in a web application?

Advantages:

- **Statelessness**:JWTs are self-contained tokens that carry user information and are signed, making them stateless. This means the server doesn't need to store session data, making it scalable and reducing server-side overhead
- **Security**:JWTs can be signed and optionally encrypted, providing a level of security against tampering. This makes them suitable for transmitting sensitive user data securely.
- **Decentralized**:JWTs can be issued by various identity providers, which allows for decentralized authentication. Users can log in through different providers (like social media accounts) without the need for centralized authentication systems.
- **Performance**:JWTs are lightweight and can be easily included in HTTP headers or as URL parameters, resulting in efficient transmission over networks.

Disadvantages:

- **Limited Revocation**: JWTs are stateless, which means once issued, they are valid until they expire. Revoking a JWT before its expiration time is challenging, and requires additional workarounds like storing a blacklist of revoked tokens.
- **Token Size**: While compact, JWTs can become larger if they carry a lot of user information, which may affect network efficiency, especially when included in every request.
- **Security Risks**: If not implemented correctly, JWTs can be vulnerable to attacks. For instance, if a token's secret key is compromised, it can lead to security breaches. Also, JWTs don't inherently protect against session fixation attacks.

5. What are all the ways you can think of to write BAD React code?

- Lack of Componentization
- Complex JSX in Render Methods
- Direct DOM Manipulation
- Ignoring of State Management when it is needed
- No Error Handling
- Inline Styles
- Component Hell. To much nesting
- Excessive Re-renders
- Global Variables
- No Code Splitting
- Ignoring Accessibility
- No testing

6. What new Web or React APIs are you most excited about?

**Intersection Observer API**

- Lazy-loading of images or other content as a page is scrolled.
- Implementing "infinite scrolling" websites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
- Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.
