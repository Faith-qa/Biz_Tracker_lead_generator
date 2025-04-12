from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description="Business Lead Generation and Management System",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import and include routers
from app.api.routes import auth, leads, bookings, communications, analytics

app.include_router(auth.router, prefix=settings.API_V1_PREFIX, tags=["Authentication"])
app.include_router(leads.router, prefix=settings.API_V1_PREFIX, tags=["Leads"])
app.include_router(bookings.router, prefix=settings.API_V1_PREFIX, tags=["Bookings"])
app.include_router(communications.router, prefix=settings.API_V1_PREFIX, tags=["Communications"])
app.include_router(analytics.router, prefix=settings.API_V1_PREFIX, tags=["Analytics"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to BizTracker Lead Generator API",
        "docs": "/docs",
        "redoc": "/redoc"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 