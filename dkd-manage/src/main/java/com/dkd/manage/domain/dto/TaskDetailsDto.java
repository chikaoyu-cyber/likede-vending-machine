package com.dkd.manage.domain.dto;

import lombok.Data;

@Data
public class TaskDetailsDto {
    private String channelCode;
    private long expectCapacity;
    private long skuId;
    private String skuName;
    private String skuImage;

}
