# 🚀 Deploying STAKE to NodeOps Network

This guide shows you how to deploy the STAKE prediction game to NodeOps using **AutoGen V2** - the "vibe coding" deployment system.

## 📋 Prerequisites

- GitHub account
- Docker installed (for local testing only - 5 min usage!)
- Your STAKE project ready to deploy

## 🎯 Student-Friendly Approach

> [!TIP]
> **Pavilion Gaming Laptop Users**: Don't run Docker 24/7! We'll only use it to test for 5 minutes, then NodeOps handles everything. This keeps your RAM free for gaming/studies and you earn $NODE tokens just for having your project deployed.

## 🛠️ Step 1: Local Testing (Optional but Recommended)

Test the Docker build locally to ensure everything works:

```bash
# Build the Docker image
docker build -t stake-game .

# Run the container
docker run -p 8080:80 stake-game

# Open in browser
# Visit: http://localhost:8080
```

**Test checklist:**
- ✅ Page loads correctly
- ✅ UI displays properly
- ✅ Connect Wallet button works
- ✅ Data displays when entering bet amount

Once verified, **stop the container** to free up resources:
```bash
# Stop when done testing
docker ps  # Find container ID
docker stop <container-id>
```

## 🌐 Step 2: Push to GitHub

Make sure your code is on GitHub (NodeOps deploys from there):

```bash
# Add Docker files to git
git add Dockerfile .dockerignore NODEOPS_DEPLOYMENT.md

# Commit changes
git commit -m "Add NodeOps deployment configuration"

# Push to GitHub
git push origin main
```

Your GitHub repository URL will look like:
```
https://github.com/Earthagrawal/Stake
```

## 🚀 Step 3: Deploy via NodeOps AutoGen V2

### Access NodeOps Console

1. Go to [NodeOps AutoGen V2 Console](https://app.nodeops.xyz) (or the current NodeOps platform)
2. Sign in with your wallet or GitHub account

### The "Vibe Coding" Deployment

Instead of complex configurations, **just talk to the AI**:

1. **In the NodeOps GPT chat interface, paste:**
   ```
   I have a Web3 prediction game on GitHub that needs deployment. 
   
   Repository: https://github.com/Earthagrawal/Stake
   
   It's a static frontend with nginx. Set up deployment with:
   - Custom subdomain (stake.nodeops.xyz or similar)
   - Automatic SSL/HTTPS
   - Port 80 exposed
   ```

2. **The AI will:**
   - Scan your repository
   - Detect the Dockerfile
   - Generate deployment blueprints
   - Suggest a subdomain
   - Configure SSL automatically

3. **Review and Confirm:**
   - NodeOps GPT will show you the proposed configuration
   - Click **"Confirm"** or **"Deploy"**

### Expected Output

NodeOps will provide:
- ✅ Deployment URL (e.g., `https://stake-xyz.nodeops.app`)
- ✅ SSL certificate (automatic HTTPS)
- ✅ Build logs
- ✅ Container status

## 🔍 Step 4: Verify Deployment

Once deployed, test your live application:

1. **Open the provided URL** in your browser
2. **Test core functionality:**
   - Connect MetaMask wallet
   - Ensure it prompts for Monad network (Chain ID: 0x279f)
   - Enter bet amount to see prediction data
   - Try placing a test bet

3. **Check contract connection:**
   - Verify it connects to: `0xF289Bb3a57238A7B6f6cE3894e487FF8e9dDa088`
   - Test with a small bet on Monad testnet

## 🎮 Managing Your Deployment

### Updates and Redeployments

When you update your code:
```bash
git add .
git commit -m "Update frontend design"
git push origin main
```

NodeOps will automatically redeploy (if auto-deploy is enabled), or you can trigger it via the console.

### Monitoring

- **Dashboard**: View deployment status in NodeOps console
- **Logs**: Check container logs for errors
- **Analytics**: Track visits and usage

### Earning $NODE Tokens

> [!IMPORTANT]
> **Proof of Build**: NodeOps rewards you with $NODE tokens for:
> - Keeping your project active and updated
> - Maintaining uptime
> - Regular commits to GitHub
>
> This is passive income for students - your project earns while you study!

## 🎯 Alternative: Two Separate Projects

If you have **two separate projects** to deploy (e.g., frontend + backend):

```
I have two Node.js projects on GitHub:
1. Frontend: https://github.com/user/stake-frontend
2. Backend: https://github.com/user/stake-backend

Set up deployments for both with separate subdomains and shared database access.
```

NodeOps GPT will configure both with proper networking and environment variables.

## 🐛 Troubleshooting

### Build Fails
- Check `Dockerfile` syntax
- Ensure `frontend/` directory exists
- Review build logs in NodeOps console

### Application Not Loading
- Verify port 80 is exposed
- Check nginx configuration
- Review browser console for errors

### Wallet Connection Issues
- Ensure MetaMask is installed
- Check network configuration (Monad Testnet)
- Verify contract address is correct

### Performance Issues
- NodeOps handles scaling automatically
- Check container resource allocation in dashboard
- Consider CDN for static assets (NodeOps may provide this)

## 📚 Resources

- [NodeOps Documentation](https://docs.nodeops.xyz)
- [AutoGen V2 Guide](https://nodeops.xyz/autogen)
- [Monad Blockchain Docs](https://docs.monad.xyz)

## 🎉 Success!

Your STAKE game is now live on NodeOps! Share your deployment URL and start earning $NODE tokens while providing a great Web3 gaming experience.

---

**Remember**: Keep Docker closed when not testing. NodeOps handles all the hosting - your laptop stays free for gaming! 🎮
