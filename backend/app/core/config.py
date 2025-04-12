from typing import Optional
from pydantic_settings import BaseSettings
from pydantic import EmailStr, validator
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # Application Settings
    APP_NAME: str = "BizTracker"
    API_V1_PREFIX: str = "/api/v1"
    DEBUG: bool = True
    ENVIRONMENT: str = "development"
    
    # Database Settings
    DATABASE_URL: str
    
    # Security Settings
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # External Services
    OPENAI_API_KEY: Optional[str] = None
    TWILIO_ACCOUNT_SID: Optional[str] = None
    TWILIO_AUTH_TOKEN: Optional[str] = None
    WHATSAPP_BUSINESS_API_TOKEN: Optional[str] = None
    
    # Redis Settings
    REDIS_URL: str
    
    # Google Calendar Settings
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    
    @validator("DATABASE_URL", pre=True)
    def validate_database_url(cls, v: Optional[str]) -> str:
        if not v:
            raise ValueError("DATABASE_URL environment variable is required")
        return v
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings() 