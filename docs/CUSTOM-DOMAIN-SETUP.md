# Custom Domain Setup for Cloud Run

This guide explains how to set up a custom domain `solutions.natnya.fr` with HTTPS for your Cloud Run service.

## Table of Contents
- [Overview](#overview)
- [Manual Steps via GCP Console](#manual-steps-via-gcp-console)
- [Automated Setup with Make](#automated-setup-with-make)
- [DNS Configuration](#dns-configuration)
- [Verification](#verification)

## Overview

Cloud Run automatically provides:
- HTTPS with SSL/TLS certificates (free)
- HTTP to HTTPS redirection
- No additional cost for custom domains

## Manual Steps via GCP Console

### Step 1: Access Domain Mappings
1. Go to [GCP Console](https://console.cloud.google.com/)
2. Select project: `home-natnya-fr-20180707`
3. Navigate to **Cloud Run** (search in top bar)
4. Click **Domain Mappings** in the left sidebar (under "Run")

### Step 2: Create Domain Mapping
1. Click **"ADD DOMAIN MAPPING"**
2. Fill in the form:
   - **Domain**: `solutions.natnya.fr`
   - **Region**: `europe-west1`
   - **Service**: Select `natya-web`
3. Click **"Continue"**
4. **Important**: Copy the DNS records shown (you'll need them)

### Step 3: Configure DNS Records
You'll see DNS records like:
```
Record type: CNAME
Name: solutions
Value: ghs.googlehosted.com
```

Or A records with multiple IP addresses.

**Add these records to your DNS provider:**
- Go to your domain registrar (where you manage `natnya.fr`)
- Add the DNS records exactly as shown
- Save and wait for propagation (5-30 minutes)

### Step 4: Wait for SSL Certificate
- Google automatically provisions SSL certificates
- Check status: **Domain Mappings** → Click on `solutions.natnya.fr`
- Status will show "Active" when ready

### Step 5: Verify
- Visit: `https://solutions.natnya.fr`
- Should redirect from `http://` to `https://` automatically

---

## Automated Setup with Make

### Quick Setup
```bash
# Map the domain
make gcp-domain-map

# Get DNS records to add
make gcp-domain-info

# Check status
make gcp-domain-status
```

### Custom Domain
```bash
# Use a different domain
make gcp-domain-map DOMAIN_NAME=www.natnya.fr
```

---

## DNS Configuration

### Required Records (Example)

**CNAME Record** (most common):
```
Type: CNAME
Name: solutions
Value: ghs.googlehosted.com
TTL: 3600 (or default)
```

**A Records** (if multiple IPs provided):
```
Type: A
Name: solutions
Value: 142.250.x.x, 216.58.x.x, etc.
TTL: 3600
```

### DNS Providers
Common providers and where to add records:
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Google Domains**: DNS → Custom resource records
- **Cloudflare**: DNS → Records → Add record
- **OVH**: Domain → DNS Zone → Add entry

### HTTP to HTTPS Redirect
Cloud Run automatically redirects `http://` → `https://` once configured. No additional setup needed.

---

## Verification

### Check Domain Status
```bash
make gcp-domain-status
```

### List All Domains
```bash
make gcp-domain-list
```

### Test the Website
```bash
# Test HTTP (should redirect)
curl -v http://solutions.natnya.fr

# Test HTTPS
curl -v https://solutions.natnya.fr
```

### Browser Testing
1. Open `https://solutions.natnya.fr` in a browser
2. Check the SSL certificate (click the lock icon)
3. Verify it's valid and issued by Google

---

## Troubleshooting

### Domain not resolving
- **Issue**: DNS propagation hasn't completed
- **Solution**: Wait 5-30 minutes, check with `nslookup solutions.natnya.fr`

### SSL certificate not ready
- **Issue**: Certificate provisioning can take up to 30 minutes
- **Solution**: Check status with `make gcp-domain-status`

### Wrong service mapped
- **Issue**: Domain points to wrong Cloud Run service
- **Solution**: Delete and recreate the mapping

### DNS records incorrect
- **Issue**: Typos or wrong values in DNS records
- **Solution**: Delete records at DNS provider, get fresh records from `make gcp-domain-info`, re-add

---

## Useful Commands

```bash
# View all domain mappings
gcloud beta run domain-mappings list --region europe-west1

# Get DNS records for a specific domain
gcloud beta run domain-mappings describe solutions.natnya.fr --region europe-west1 \
  --format="yaml(status.resourceRecords)"

# Check SSL certificate status
gcloud beta run domain-mappings describe solutions.natnya.fr --region europe-west1 \
  --format="value(status.conditions)"

# Delete a domain mapping
gcloud beta run domain-mappings delete solutions.natnya.fr --region europe-west1
```

---

## Resources Created

When you complete this setup, the following are created in GCP:
- **Domain Mapping**: Maps `solutions.natnya.fr` → Cloud Run service `natya-web`
- **SSL Certificate**: Automatically provisioned by Google (managed certificate)
- **DNS Records**: Must be added to your DNS provider

---

## Next Steps

After domain is working:
- Test the full application flow
- Verify all pages load correctly
- Check that search engines can index (if needed)
- Monitor Cloud Run logs for any issues


