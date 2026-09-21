from pydantic import BaseModel,Field
from typing import Literal

class PropertyCreate(BaseModel):
    title : str | None = Field(min_length=2,max_length=100)
    address : str = Field(min_length=5 , max_length=100)
    property_type : Literal["appartment","house","room","other"]
    monthly_rent :float = Field(gt=0)
    availability = Literal["available","occupied"]
    description : str | None = Field(max_length=500,default=None)

