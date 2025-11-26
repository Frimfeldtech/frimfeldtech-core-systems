from pydantic import BaseModel

class DataPayload(BaseModel):
    values: list[float]
