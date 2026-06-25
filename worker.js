let domain = "这里填机场域名";
let user = "这里填邮箱";
let pass = "这里填密码";
let BotToken = '';
let ChatID = '';

export default {
    async fetch(request, env, ctx) {
        try {
            // Init
            domain = env.JC || env.DOMAIN || domain;
            user = env.ZH || env.USER || user;
            pass = env.MM || env.PASS || pass;
            if (!domain.includes("//")) domain = `https://${domain}`;
            BotToken = env.TGTOKEN || BotToken;
            ChatID = env.TGID || ChatID;
            
            const url = new URL(request.url);
            
            if (url.pathname === "/") {
                return new Response("✅ Worker is alive!\nDomain: " + domain + "\nUser: " + user, {
                    headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
                });
            }
            
            if (url.pathname === "/tg") {
                return new Response("TGID: " + ChatID, { headers: { 'Content-Type': 'text/plain' } });
            }
            
            return new Response("Not Found", { status: 404 });
        } catch (e) {
            return new Response("Crash: " + e.message + "\n" + (e.stack || ''), { status: 500 });
        }
    }
};
