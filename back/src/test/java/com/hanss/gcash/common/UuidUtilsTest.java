package com.hanss.gcash.common;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class UuidUtilsTest {
    @Test
    void testNewGuid()
    {
        String uuid = UuidUtils.newGuid();
        System.out.println("A new uuid is " + uuid);
        Assertions.assertEquals( 32 , uuid.length());
    }
}